import { ISkill } from "@/subapps/practice/entities/resume/model/types";
import { Card } from "@agaspher/apply.ui-kit";
import React, { memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";
interface SkillCardProps {
  skill: ISkill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const color = {
    0.2: "bg-red-400",
    0.4: "bg-orange-400",
    0.6: "bg-yellow-400",
    0.8: "bg-lime-400",
    1: "bg-green-400",
  }[skill.level];
  return (
    <Card className="grid grid-cols-7 items-center gap-2 p-3">
      <h3 className="text-lg font-semibold col-span-2">{skill.skill_name}</h3>
      <div className="col-span-5 w-full grid grid-cols-5 gap-1">
        <div
          className={twMerge(
            "w-full h-2 bg-green-400 rounded-full",
            color,
            skill.level < 0.2 && "bg-gray-400"
          )}
        ></div>
        <div
          className={twMerge(
            "w-full h-2 bg-green-400 rounded-full",
            color,
            skill.level < 0.4 && "bg-gray-400"
          )}
        ></div>
        <div
          className={twMerge(
            "w-full h-2 bg-green-400 rounded-full",
            color,
            skill.level < 0.6 && "bg-gray-400"
          )}
        ></div>
        <div
          className={twMerge(
            "w-full h-2 bg-green-400 rounded-full",
            color,
            skill.level < 0.8 && "bg-gray-400"
          )}
        ></div>
        <div
          className={twMerge(
            "w-full h-2 bg-green-400 rounded-full",
            color,
            skill.level < 1 && "bg-gray-400"
          )}
        ></div>
      </div>
    </Card>
  );
};

export default memo(SkillCard);
