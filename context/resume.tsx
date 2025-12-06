"use client";

import {
  ChangeEvent,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import type { ResumeContext } from "@/types";
import {
  getUserResumesFromDb,
  saveResumeToDb,
  getResumeFromDb,
  updateResumeInDb,
  updateExperienceToDb,
  updateEducationToDb,
  updateSkillstoDB,
  deleteResumeFromDb,
} from "@/lib/actions/resume.actions";
import { type ResumeType } from "@/models/resume";
import toast from "react-hot-toast";
import { useRouter, useParams, usePathname } from "next/navigation";
import { ExperienceType } from "@/models/experience";
import { runAi } from "@/lib/actions/ai.actions";
import { EducationType } from "@/models/education";
import { SkillType } from "@/models/skill";

const INITIAL_EXPERIENCE = {
  title: "",
  company: "",
  address: "",
  startDate: "",
  endDate: "",
  summary: "",
};
const INITIAL_EDUCATION = {
  name: "",
  address: "",
  qualification: "",
  year: "",
};
const INITIAL_SKILL = { name: "", level: "" };

const INITIAL_STATE = {
  userEmail: "",
  title: "",
  name: "",
  job: "",
  address: "",
  phone: "",
  themeColor: "",
  summary: "",
  experience: [INITIAL_EXPERIENCE],
  education: [INITIAL_EDUCATION],
  skills: [INITIAL_SKILL],
};

const getInitialResumeContext = () => {
  if (typeof window !== "undefined" && localStorage.getItem("resume")) {
    return JSON.parse(localStorage.getItem("resume")!);
  } else {
    return INITIAL_STATE;
  }
};

const ResumeContext = createContext<ResumeContext | undefined>(undefined);

const ResumeProvider = ({ children }: { children: ReactNode }) => {
  // State
  const [resume, setResume] = useState<ResumeType>(getInitialResumeContext());
  const [resumes, setResumes] = useState<ResumeType[]>([]);
  const [step, setStep] = useState<number>(1);
  const [experiences, setExperiences] = useState<ExperienceType[]>([
    INITIAL_EXPERIENCE,
  ]);
  const [experienceLoading, setExperienceLoading] = useState([false]);
  const [educationList, setEducationList] = useState<EducationType[]>([
    INITIAL_EDUCATION,
  ]);
  const [skills, setSkills] = useState<SkillType[]>([INITIAL_SKILL]);

  // Hooks
  const router = useRouter();
  const { _id } = useParams();
  const pathname = usePathname();

  // Context Functions - Resume
  const saveResume = async () => {
    try {
      const data = await saveResumeToDb(resume);
      setResume(data);
      localStorage.removeItem("resume");
      toast.success("Resume saved successfully. Keep building");
      setStep(2);
      router.push(`/dashboard/resume/edit/${data._id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save resume");
    }
  };

  const getUserResumes = useEffectEvent(async () => {
    try {
      const data = await getUserResumesFromDb();
      setResumes(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get resumes");
    }
  });

  const getResume = useEffectEvent(async () => {
    try {
      const data = await getResumeFromDb(_id as string);
      setResume(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get resumes");
    }
  });

  const updateResume = async () => {
    try {
      const data = await updateResumeInDb(resume);
      setResume(data);
      toast.success("Resume updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to get resumes");
    }
  };

  const resetResume = useEffectEvent(() => {
    setResume(INITIAL_STATE);
    setStep(1);
  });

  // Context Functions - Experiences
  const setExperiencesFromResume = useEffectEvent(() => {
    if (resume.experience) setExperiences(resume.experience);
  });

  const handleExperienceChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newEntries = [...experiences];
    const { name, value } = e.target;
    newEntries[index][name as keyof ExperienceType] = value;
    setExperiences(newEntries);
  };

  const handleExperienceQuillChange = (value: string, index: number) => {
    const newEntries = [...experiences];
    newEntries[index].summary = value;
    setExperiences(newEntries);
  };

  const updateExperience = async (experiences: ExperienceType[]) => {
    try {
      const data = await updateExperienceToDb({
        ...resume,
        experience: experiences,
      });

      setResume(data);
      toast.success("Experience updated! Keep on building!");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  const handleExperienceSubmit = () => {
    updateExperience(experiences);
    setStep(4);
  };

  const addExperience = () => {
    const newExperience = { ...INITIAL_EXPERIENCE };
    setExperiences([...experiences, newExperience]);
    setResume((prevState) => ({
      ...prevState,
      experience: [...experiences, newExperience],
    }));
  };

  const removeExperience = () => {
    if (experiences.length === 1) return;

    const newEntries = experiences.slice(0, experiences.length - 1);
    setExperiences(newEntries);
    updateExperience(newEntries);
  };

  const handleGenerateExperienceWithAi = async (index: number) => {
    setExperienceLoading((prevState) => ({ ...prevState, [index]: true }));

    const selectedExperience = experiences[index];

    if (!selectedExperience || !selectedExperience.title) {
      toast.error(
        "Please fill in the job details for the selected experience entry"
      );
      setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
      return;
    }

    const jobTitle = selectedExperience.title;
    const jobSummary = selectedExperience.summary || "";

    try {
      const response = await runAi(
        `Generate a list of duties and responsibilities in HTML bullet points for the job title: "${jobTitle}" ${jobSummary}. Please only return the bulleted list but not in markdown and limit the number of points to 5.`
      );

      const updatedExperiences = experiences.slice();
      updatedExperiences[index] = { ...selectedExperience, summary: response };

      setExperiences(updatedExperiences);
      setResume((prevState) => ({
        ...prevState,
        experience: updatedExperiences,
      }));
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
    }
  };

  const setEducationFromResume = useEffectEvent(() => {
    if (resume.education) {
      setEducationList(resume.education);
    }
  });

  const updateEducation = async (educationList: EducationType[]) => {
    try {
      const data = await updateEducationToDb({
        ...resume,
        education: educationList,
      });

      setResume(data);
      toast.success("Experience updated! Keep on building!");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  const handleEducationChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newEntries = [...educationList];
    const { name, value } = e.target;
    newEntries[index][name as keyof EducationType] = value;
    setEducationList(newEntries);
  };

  const handleEducationSubmit = () => {
    updateEducation(educationList);
    setStep(5);
  };

  const addEducation = () => {
    const newEducation = { ...INITIAL_EDUCATION };
    console.log(newEducation);
    setEducationList([...educationList, newEducation]);
    setResume((prevState) => ({
      ...prevState,
      education: [...educationList, newEducation],
    }));
  };

  const removeEducation = () => {
    if (educationList.length === 1) return;

    const newEntries = educationList.slice(0, educationList.length - 1);
    setEducationList(newEntries);
    // Update DB
  };

  const setSkillsFromResume = useEffectEvent(() => {
    setSkills(resume.skills);
  });

  const updateSkills = async (skills: SkillType[]) => {
    const invalidSkills = skills.filter((skill) => !skill.name || !skill.level);
    if (invalidSkills.length > 0) {
      toast.error("Please fill in both skill name and level");
      return;
    }

    try {
      const data = await updateSkillstoDB({
        ...resume,
        skills: skills,
      });
      setResume(data);
      toast.success("Skills updated. Keep building!");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  const handleSkillsChange = (
    e: { target: { name: string; value: string } },
    index: number
  ) => {
    const newEntries = [...skills];
    const { name, value } = e.target;
    newEntries[index][name as keyof SkillType] = value;
    setSkills(newEntries);
  };

  const handleSkillsSubmit = () => {
    updateSkills(skills);
    router.push(`/dashboard/resume/download/${resume._id}`);
  };

  const addSkill = () => {
    const newSkill = { ...INITIAL_SKILL };
    setSkills([...skills, newSkill]);
    setResume((prevState) => ({
      ...prevState,
      skills: [...skills, newSkill],
    }));
  };

  const removeSkill = () => {
    if (skills.length === 1) return;
    const newEntries = skills.slice(0, skills.length - 1);
    setSkills(newEntries);
    updateSkills(newEntries);
  };

  const deleteResume = async (_id: string) => {
    try {
      await deleteResumeFromDb(_id);
      setResumes(resumes.filter((resume) => resume._id !== _id));
      toast.success("Resume deleted!");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  // Context
  const context: ResumeContext = {
    resume,
    resumes,
    setResume,
    saveResume,
    updateResume,
    step,
    setStep,
    experiences,
    experienceLoading,
    setExperienceLoading,
    handleExperienceChange,
    handleExperienceQuillChange,
    handleExperienceSubmit,
    addExperience,
    removeExperience,
    handleGenerateExperienceWithAi,
    educationList,
    handleEducationChange,
    handleEducationSubmit,
    addEducation,
    removeEducation,
    skills,
    handleSkillsChange,
    handleSkillsSubmit,
    addSkill,
    removeSkill,
    deleteResume,
  };

  // Effects
  useEffect(() => {
    getUserResumes();
  }, []);

  useEffect(() => {
    if (_id) getResume();
  }, [_id]);

  useEffect(() => {
    if (pathname.includes("/resume/create")) resetResume();
  }, [pathname]);

  useEffect(() => {
    setExperiencesFromResume();
    setEducationFromResume();
    setSkillsFromResume();
  }, [resume]);

  return (
    <ResumeContext.Provider value={context}>{children}</ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error(
      "ResumeContext must be used within a ResumeContext.Provider"
    );
  }

  return context;
};

export default ResumeProvider;
