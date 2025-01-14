import React, { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { ISkill } from "@/subapps/practice/entities/resume/model/types";
import { ResumeApi } from "@/subapps/practice/entities/resume";
import { Card } from "@agaspher/apply.ui-kit";
interface SkillItemProps {
  skill: ISkill;
  resumeId: string;
  onChange: (newValue: number) => void;
  onDelete: () => void;
}

const SkillItem: React.FC<SkillItemProps> = ({
  resumeId,
  skill,
  onChange,
  onDelete,
}) => {
  const [value, setValue] = useState(skill.level);
  const color = useMemo(() => {
    return {
      0.2: "bg-red-400",
      0.4: "bg-orange-400",
      0.6: "bg-yellow-400",
      0.8: "bg-lime-400",
      1: "bg-green-400",
    }[value];
  }, [value]);

  function updateValue(newValue: number) {
    setValue(newValue);
    ResumeApi.updateSkill(resumeId, skill.id, newValue);
    onChange(newValue);
  }
  function deleteSkill() {
    ResumeApi.deleteSkill(resumeId, skill.id);
    onDelete();
  }

  return (
    <Card className="items-center gap-2">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{skill.skill_name}</h3>
        <button
          onClick={deleteSkill}
          className="text-lg text-red-500 font-semibold"
        >
          Удалить
        </button>
      </div>
      <div className="flex justify-between text-xs mt-4">
        <p>Есть небольшой опыт</p>
        <p>Отличное знание</p>
      </div>
      <div className="mt-2 w-full grid grid-cols-5 gap-1">
        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          onClick={() => {
            updateValue(0.2);
          }}
          className={twMerge(
            "w-full h-4 bg-gray-400 transition-all rounded-full",
            value >= 0.2 && color
          )}
        ></motion.button>
        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          onClick={() => {
            updateValue(0.4);
          }}
          className={twMerge(
            "w-full h-4 bg-gray-400 transition-all rounded-full",
            value >= 0.4 && color
          )}
        ></motion.button>
        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          onClick={() => {
            updateValue(0.6);
          }}
          className={twMerge(
            "w-full h-4 bg-gray-400 transition-all rounded-full",
            value >= 0.6 && color
          )}
        ></motion.button>
        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          onClick={() => {
            updateValue(0.8);
          }}
          className={twMerge(
            "w-full h-4 bg-gray-400 transition-all rounded-full",
            value >= 0.8 && color
          )}
        ></motion.button>
        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          onClick={() => {
            updateValue(1);
          }}
          className={twMerge(
            "w-full h-4 bg-gray-400 transition-all rounded-full",
            value >= 1 && color
          )}
        ></motion.button>
      </div>
    </Card>
  );
};

export default SkillItem;
