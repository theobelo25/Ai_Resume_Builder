"use client";
import { useResumeContext } from "@/context/resume";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Plus, X } from "lucide-react";
import { ChangeEvent } from "react";

const SKILL_LEVELS = [
  { label: "Poor", value: 1 },
  { label: "Basic", value: 2 },
  { label: "Moderate", value: 3 },
  { label: "Advanced", value: 4 },
  { label: "Expert", value: 5 },
];

const StepFive = () => {
  const {
    skills,
    handleSkillsChange,
    handleSkillsSubmit,
    addSkill,
    removeSkill,
  } = useResumeContext();
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Skills</h2>
      <ul>
        {skills.length > 0 &&
          skills.map((skill, index) => (
            <li key={index} className="mb-10">
              <Input
                name="name"
                type="text"
                placeholder="Skill name"
                value={skill.name!}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSkillsChange(e, index)
                }
                className="mb-3"
                autoFocus
              />

              <div className="flex space-x-2">
                {SKILL_LEVELS.map((level) => (
                  <Button
                    key={level.value}
                    variant={
                      Number(skill.level) === level.value ? "secondary" : "link"
                    }
                    onClick={() =>
                      handleSkillsChange(
                        {
                          target: {
                            name: "level",
                            value: level.value.toString(),
                          },
                        },
                        index
                      )
                    }
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </li>
          ))}
      </ul>
      <div className="flex justify-between mt-3">
        <Button variant={"outline"} onClick={addSkill}>
          <Plus size={18} className="mr-2" />
          Add
        </Button>
        {skills.length > 1 && (
          <Button variant={"outline"} onClick={removeSkill}>
            <X size={18} className="mr-2" />
            Remove
          </Button>
        )}
        <Button variant={"outline"} onClick={handleSkillsSubmit}>
          <ArrowRight size={18} className="mr-2" />
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepFive;
