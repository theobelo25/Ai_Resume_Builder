"use client";
import { ResumeType } from "@/models/resume";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const Summary = ({ resume }: { resume: ResumeType }) => {
  return (
    <div className="mt-5">
      <h2 className="font-bold mb-3" style={{ color: resume.themeColor! }}>
        Summary
      </h2>

      <ReactQuill
        readOnly
        value={resume.summary!}
        theme="bubble"
        className="text-xs font-normal"
      />
    </div>
  );
};

export default Summary;
