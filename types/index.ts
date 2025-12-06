import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ResumeType } from "@/models/resume";
import { ExperienceType } from "@/models/experience";
import { EducationType } from "@/models/education";
import { SkillType } from "@/models/skill";

// ResumeContext Interface
export interface ResumeContext {
  resume: ResumeType;
  resumes: ResumeType[];
  setResume: Dispatch<SetStateAction<ResumeType>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  saveResume: () => void;
  updateResume: () => void;
  experiences: ExperienceType[];
  experienceLoading: boolean[];
  setExperienceLoading: Dispatch<SetStateAction<boolean[]>>;
  handleExperienceChange: (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleExperienceQuillChange: (value: string, index: number) => void;
  handleExperienceSubmit: () => void;
  addExperience: () => void;
  removeExperience: () => void;
  handleGenerateExperienceWithAi: (index: number) => void;
  educationList: EducationType[];
  handleEducationChange: (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleEducationSubmit: () => void;
  addEducation: () => void;
  removeEducation: () => void;
  skills: SkillType[];
  handleSkillsChange: (
    e: { target: { name: string; value: string } },
    index: number
  ) => void;
  handleSkillsSubmit: () => void;
  addSkill: () => void;
  removeSkill: () => void;
  deleteResume: (_id: string) => void;
}
