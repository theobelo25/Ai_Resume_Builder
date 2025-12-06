"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResumeContext } from "@/context/resume";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { ArrowRight, Plus, X, Loader2Icon, Brain } from "lucide-react";
import { ChangeEvent } from "react";

const StepThree = () => {
  const {
    experiences,
    handleExperienceChange,
    handleExperienceQuillChange,
    handleExperienceSubmit,
    handleGenerateExperienceWithAi,
    addExperience,
    removeExperience,
    experienceLoading,
  } = useResumeContext();

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Experiences</h2>
      <ul>
        {experiences.length > 0 &&
          experiences.map((experience, index) => (
            <li key={index} className="mb-10">
              <Input
                name="title"
                type="text"
                placeholder="Job title"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleExperienceChange(e, index)
                }
                value={experience.title!}
                className="mb-3"
                autoFocus
              />
              <Input
                name="company"
                type="text"
                placeholder="Company Name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleExperienceChange(e, index)
                }
                value={experience.company!}
                className="mb-3"
              />
              <Input
                name="address"
                type="text"
                placeholder="Company address"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleExperienceChange(e, index)
                }
                value={experience.address!}
                className="mb-3"
              />
              <Input
                name="startDate"
                type="text"
                placeholder="Start date"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleExperienceChange(e, index)
                }
                value={experience.startDate!}
                className="mb-3"
              />
              <Input
                name="endDate"
                type="text"
                placeholder="End date"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleExperienceChange(e, index)
                }
                value={experience.endDate!}
                className="mb-3"
              />
              <ReactQuill
                theme="snow"
                onChange={(value) => handleExperienceQuillChange(value, index)}
                value={experience.summary!}
              />
              <div className="flex justify-end">
                <Button
                  variant={"destructive"}
                  onClick={() => handleGenerateExperienceWithAi(index)}
                  disabled={experienceLoading[index]}
                  className="mt-5"
                >
                  {experienceLoading[index] ? (
                    <Loader2Icon size={18} className="mr-2 animate-spin" />
                  ) : (
                    <Brain size={18} />
                  )}
                  Generate with Ai
                </Button>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex justify-between mt-3">
        <Button variant={"outline"} onClick={addExperience}>
          <Plus size={18} className="mr-2" />
          Add
        </Button>
        {experiences.length > 1 && (
          <Button variant={"outline"} onClick={removeExperience}>
            <X size={18} className="mr-2" />
            Remove
          </Button>
        )}
        <Button variant={"outline"} onClick={handleExperienceSubmit}>
          <ArrowRight size={18} className="mr-2" />
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
