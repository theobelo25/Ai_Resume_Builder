"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight, Plus, X } from "lucide-react";
import { useResumeContext } from "@/context/resume";
import { ChangeEvent } from "react";

const StepFour = () => {
  const {
    educationList,
    handleEducationChange,
    handleEducationSubmit,
    addEducation,
    removeEducation,
  } = useResumeContext();

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-5">Education</h2>
      {educationList.length > 0 &&
        educationList.map((edu, index) => (
          <div key={index} className="mb-10">
            <Input
              name="name"
              type="text"
              placeholder="School/College/University name"
              value={edu.name!}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleEducationChange(e, index)
              }
              className="mb-3"
              autoFocus
            />
            <Input
              name="address"
              type="text"
              placeholder="School/College/University address"
              value={edu.address!}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleEducationChange(e, index)
              }
              className="mb-3"
            />
            <Input
              name="qualification"
              type="text"
              placeholder="Qualification earned"
              value={edu.qualification!}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleEducationChange(e, index)
              }
              className="mb-3"
            />
            <Input
              name="year"
              type="text"
              placeholder="Year completed"
              value={edu.year!}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleEducationChange(e, index)
              }
              className="mb-3"
            />
          </div>
        ))}

      <div className="flex justify-between mt-3">
        <Button variant={"outline"} onClick={addEducation}>
          <Plus size={18} className="mr-2" />
          Add
        </Button>
        {educationList.length > 1 && (
          <Button variant={"outline"} onClick={removeEducation}>
            <X size={18} className="mr-2" />
            Remove
          </Button>
        )}
        <Button variant={"outline"} onClick={handleEducationSubmit}>
          <ArrowRight size={18} className="mr-2" />
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
