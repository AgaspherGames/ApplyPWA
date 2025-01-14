import React, { useContext, useState } from "react";
import MotionTab from "./MotionTab";
import WorkExperienceModal from "../../WorkExperienceModal";
import WorkExperienceCard from "@/subapps/practice/widgets/WorkExperienceCard";
import { IExperience } from "@/subapps/practice/entities/resume";
import { ResumeContext } from "./ResumeCreateForm";
import { Card, CustomButton, Title } from "@agaspher/apply.ui-kit";
interface ExperienceTabProps {
  tab: number;
  setTab: (tab: number) => void;
}

const ExperienceTab: React.FC<ExperienceTabProps> = ({ tab, setTab }) => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);

  function addExperience(experience: IExperience) {
    setExperiences((prev) => [...prev, experience]);
  }
  function removeExperience(experience: IExperience) {
    console.log(experience, experience.id, "a");

    setExperiences((prev) => prev.filter((e) => e.id != experience.id));
  }
  function updateExperiences(experience: IExperience) {
    setExperiences((prev) =>
      prev.map((p) => {
        if (p.id == experience.id) return experience;
        return p;
      })
    );
  }

  const resumeId = useContext(ResumeContext);

  return (
    <MotionTab activeTab={tab} tab={2}>
      <Card className="my-4 absolute inset-0 overflow-scroll">
        <div>
          <div className="flex items-center">
            <p className="text-lg font-semibold mb-2">Опыт работы</p>
          </div>
        </div>
        <WorkExperienceModal
          resumeId={resumeId}
          onDelete={() => {}}
          onSave={addExperience}
        />
        <div className=" grid gap-4">
          {experiences.map((el) => (
            <WorkExperienceCard
              onDelte={removeExperience}
              onUpdate={updateExperiences}
              resumeId={resumeId}
              experience={el}
              key={el.id}
            />
          ))}
          {!experiences.length && (
            <Title className="m-4 text-center">Не указан опыт работы</Title>
          )}
        </div>
        <div className=" flex  flex-col gap-4 mt-4">
          <CustomButton id="add-work-experience" className="w-full">
            Добавить опыт работы
          </CustomButton>
        </div>
        <CustomButton className="mt-4 w-full" onClick={() => setTab(3)}>
          {experiences.length ? "Далее" : "У меня нет опыта работы"}
        </CustomButton>
      </Card>
    </MotionTab>
  );
};

export default ExperienceTab;
