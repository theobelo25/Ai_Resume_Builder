"use client";
import { ResumeType } from "@/models/resume";
import { Card } from "../ui/card";
import PersonalDetails from "../preview/personal-details";
import Link from "next/link";
import Summary from "../preview/summary";
import Experience from "../preview/experience";
import Education from "../preview/education";
import Skills from "../preview/skills";
import { Button } from "../ui/button";
import { UserPen, Download, Trash } from "lucide-react";
import { useResumeContext } from "@/context/resume";

const ResumeCard = ({ resume }: { resume: ResumeType }) => {
  const { deleteResume } = useResumeContext();

  return (
    <Card
      className="relative w-full rounded-xl p-5 border-t-20"
      style={{
        borderColor: resume.themeColor!,
      }}
    >
      <div className="line-clamp-3">
        <PersonalDetails resume={resume} />
      </div>
      <div className="line-clamp-4">
        <Summary resume={resume} />
      </div>
      <div className="line-clamp-3">
        <Experience resume={resume} />
      </div>
      <div className="line-clamp-3">
        <Education resume={resume} />
      </div>
      <div className="line-clamp-3">
        <Skills resume={resume} />
      </div>
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-4">
          <Button asChild>
            <Link href={`/dashboard/resume/edit/${resume._id}`}>
              <UserPen size={16} />
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/resume/download/${resume._id}`}>
              <Download size={16} />
            </Link>
          </Button>
          <Button onClick={() => deleteResume(resume._id!)}>
            <Trash size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ResumeCard;
