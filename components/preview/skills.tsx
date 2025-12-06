import { ResumeType } from "@/models/resume";
import { Progress } from "../ui/progress";
import { Star } from "lucide-react";

const Skills = ({
  resume,
  print = false,
}: {
  resume: ResumeType;
  print?: boolean;
}) => {
  const themeColor = resume.themeColor || "#333";
  const defaultColor = "#d3d3d3";

  return (
    <div className="my-6">
      <h2 className="font-bold text-sm mb-2">Skills</h2>
      <hr style={{ borderColor: themeColor }} />
      <ul className="grid grid-cols-2 gap-3 my-4">
        {resume.skills.map((skill, index) => {
          return (
            <div key={index} className="flex items-center justify-between">
              <h3 className="text-sm font-bold mr-2">{skill.name}</h3>
              <div className="flex-1 ml-2">
                {print ? (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={20}
                        style={{
                          color:
                            index < Number(skill.level)
                              ? themeColor
                              : defaultColor,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Progress value={Number(skill.level) * 20} />
                )}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Skills;
