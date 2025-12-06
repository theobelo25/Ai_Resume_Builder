"use client";
import PersonalDetails from "../preview/personal-details";
import Summary from "../preview/summary";
import Experience from "../preview/experience";
import { useResumeContext } from "@/context/resume";
import Education from "../preview/education";
import Skills from "../preview/skills";

const PreviewCard = () => {
  const { resume } = useResumeContext();

  return (
    <div
      className="shadow-lg w-full rounded-xl p-5 border-t-20"
      style={{
        borderColor: resume.themeColor!,
      }}
    >
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
      <Experience resume={resume} />
      <Education resume={resume} />
      <Skills resume={resume} />
    </div>
  );
};

export default PreviewCard;
