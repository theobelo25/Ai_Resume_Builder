"use client";
import { Button } from "../ui/button";
import { useResumeContext } from "@/context/resume";
import { Brain, Loader2Icon } from "lucide-react";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { runAi } from "@/lib/actions/ai.actions";

const StepTwo = () => {
  const { resume, setResume, updateResume, setStep } = useResumeContext();
  const [loading, setLoading] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateResume();
    setStep(3);
  };

  const handleGenerateWithAi = async () => {
    setLoading(true);
    if (!resume.job) {
      toast.error("Please ensure you include the desired job title");
      setLoading(false);
      return;
    }

    const response = await runAi(
      `Generate a resume summary for a person with the following details: ${JSON.stringify(
        resume
      )} in plain text format. Can you please only return just the desired paragraph without an explaination around it so this will look appropriate if displayed directly to a website.`
    );

    setResume({ ...resume, summary: response });
    setLoading(false);
  };

  return (
    <div className="w-full shadow-lg border-t-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2
          className="text-2xl font-bold mb-5 py-5"
          style={{ color: resume.themeColor! }}
        >
          Summary
        </h2>
        <Button
          variant={"destructive"}
          onClick={handleGenerateWithAi}
          disabled={loading}
        >
          {loading ? (
            <Loader2Icon size={18} className="mr-2 animate-spin" />
          ) : (
            <Brain size={18} />
          )}
          Generate with Ai
        </Button>
      </div>
      <ReactQuill
        theme="snow"
        onChange={(content) => setResume({ ...resume, summary: content })}
        value={resume.summary!}
      />
      <div className="flex justify-end mt-3">
        <Button onClick={handleClick}>Next</Button>
      </div>
    </div>
  );
};

export default StepTwo;
