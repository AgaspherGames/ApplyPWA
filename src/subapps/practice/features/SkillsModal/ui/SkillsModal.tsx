import { IonModal } from "@ionic/react";
import React, { useRef, useState } from "react";
import SkillItem from "./SkillItem";
import InputModal from "../../InputModal";
import words from "@/../public/data/skills.json";
import { ISkill } from "@/subapps/practice/entities/resume/model/types";
import { ResumeApi } from "@/subapps/practice/entities/resume";
import { BackButton, Card, CustomButton, Title } from "@agaspher/apply.ui-kit";
interface SkillsModalProps {
  resumeId: string;
  skills: ISkill[];
  trigger?: string;
  onClose: (skills: ISkill[]) => void;
}

const SkillsModal: React.FC<SkillsModalProps> = ({
  resumeId,
  trigger = "open-skills-modal",
  onClose,
  skills: prevSkills,
}) => {
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const [skills, setSkills] = useState<ISkill[]>(prevSkills);

  async function createSkill(word: string) {
    const id = (
      await ResumeApi.createSkill(resumeId, {
        level: 1,
        skill_name: word,
      })
    ).data.id;

    setSkills((prev) => [
      ...prev,
      {
        id: id,
        level: 1,
        skill_name: word,
      },
    ]);
  }

  return (
    <IonModal trigger={trigger} ref={modal}>
      <BackButton
        back={() => {
          modal.current?.dismiss();
          onClose(skills);
        }}
      />
      <Card className="pt-16">
        <CustomButton
          onClick={() => {
            setIsInputModalOpen(true);
          }}
        >
          Добавить навык
        </CustomButton>
        <InputModal
          onSelect={createSkill}
          words={words}
          isOpen={isInputModalOpen}
          close={() => setIsInputModalOpen(false)}
        />
        <div className="mt-4 grid gap-4">
          {skills.map((skill) => (
            <SkillItem
              resumeId={resumeId}
              onDelete={() => {
                setSkills((prev) => prev.filter((el) => el.id != skill.id));
              }}
              onChange={(newValue: number) => {
                setSkills((prev) =>
                  prev.map((el) => {
                    if (el.id == skill.id) el.level = newValue;
                    return el;
                  })
                );
              }}
              skill={skill}
              key={skill.id}
            />
          ))}
          {!skills.length && (
            <Title className="m-4 text-center">
              Не выбрано ни одного навыка
            </Title>
          )}
        </div>
      </Card>
    </IonModal>
  );
};

export default SkillsModal;
