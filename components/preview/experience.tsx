"use client";
import { ResumeType } from "@/models/resume";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const Experience = ({ resume }: { resume: ResumeType }) => {
  return (
    <div className="my-6">
      <h2
        className="font-bold text-sm mb-2"
        style={{ color: resume.themeColor! }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resume.themeColor! }} />
      <div className="text-xs font-normal">
        {resume.experience.map((exp, index) => (
          <div key={index} className="my-5">
            <h3 className="text-sm font-bold">{exp.title}</h3>
            <h4 className="text-sm font-bold">{exp.company}</h4>
            <p className="text-xs text-gray-600 mb-5">{exp.address}</p>
            <h3 className="text-sm font-bold mb-2">
              Duties & Responsibilities
            </h3>
            {exp.summary && (
              <ReactQuill
                readOnly
                value={exp.summary as string}
                theme="bubble"
                className="text-small font-normal"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
