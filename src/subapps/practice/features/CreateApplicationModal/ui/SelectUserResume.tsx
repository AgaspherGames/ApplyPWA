import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import { IResume, useResumeStore } from "@/subapps/practice/entities/resume";
import ScrollShadow from "@/subapps/practice/shared/ui/ScrollShadow";
import { RESUME_STATUS } from "@/subapps/practice/shared/utils/StatusUtils";
import { Card, Title } from "@agaspher/apply.ui-kit";
import { IonAvatar } from "@ionic/react";
import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
interface SelectUserResumeProps {
  onSelect: (resume: IResume) => void;
  isOpen: boolean;
}

const SelectUserResume: React.FC<SelectUserResumeProps> = ({
  onSelect,
  isOpen,
}) => {
  const { userResumes } = useResumeStore();

  return (
    <motion.div
      animate={isOpen ? "open" : "close"}
      variants={{
        close: {
          opacity: 0,
          maxHeight: "0",
        },
        open: {
          opacity: 100,
          maxHeight: "300px",
        },
      }}
      className="overflow-hidden relative "
    >
      <Card className="m-4 bg-stone-900 bg-opacity-90 ">
        <Title>Ваши резюме:</Title>
        <ScrollShadow className="max-h-48 w-full py-1">
          {userResumes.map((resume) => (
            <div
              onClick={() => {
                onSelect(resume);
              }}
              key={resume.id}
              className="flex gap-2 border-b border-stone-500 py-2"
            >
              <IonAvatar className="w-10 h-10">
                <img src={getFileLink(resume.image, "avatar")} />
              </IonAvatar>
              <div>
                <p
                  className={twMerge(
                    "text-stone-500 leading-none",
                    `${RESUME_STATUS[resume.status].color}`
                  )}
                >
                  {RESUME_STATUS[resume.status].text}
                </p>
                <p className="text-lg text-white ">{resume.position}</p>
              </div>
            </div>
          ))}
        </ScrollShadow>
      </Card>
    </motion.div>
  );
};

export default SelectUserResume;
