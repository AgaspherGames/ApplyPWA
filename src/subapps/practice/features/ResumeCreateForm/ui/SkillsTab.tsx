import React, { useContext, useState } from "react";
import MotionTab from "./MotionTab";
import SkillCard from "@/subapps/practice/widgets/SkillCard";
import SkillsModal from "../../SkillsModal";
import { ResumeContext } from "./ResumeCreateForm";
import { ISkill } from "@/subapps/practice/entities/resume/model/types";
import { useRelLinks } from "@/shared/utils/hooks";
import { useIonRouter } from "@ionic/react";
import { Card, CustomButton, Title } from "@agaspher/apply.ui-kit";
interface SkillsTabProps {
  tab: number;
  setTab: (tab: number) => void;
  setResumeId: (resumeId: string) => void;
}

const SkillsTab: React.FC<SkillsTabProps> = ({ tab, setTab, setResumeId }) => {
  const resumeId = useContext(ResumeContext);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const router = useIonRouter();

  const [resumeLink] = useRelLinks(["resume/" + resumeId]);

  function finish() {
    router.push(resumeLink, "forward", "replace");
  }

  return (
    <MotionTab activeTab={tab} tab={3}>
      <div className="my-4 absolute inset-0 overflow-scroll rounded-lg">
        <Card className="h-fit">
          <div>
            <div className="flex items-center justify-between text-lg font-semibold mb-2">
              <p className=" ">Навыки</p>
              <button className="underline" id="open-skills-modal">
                Редактировать
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            {skills.map((skill) => (
              <SkillCard skill={skill} key={skill.id} />
            ))}
            {!skills.length && (
              <Title className="m-4 text-center">
                Не выбрано ни одного навыка
              </Title>
            )}
          </div>
          <CustomButton className="mt-4" onClick={finish}>
            Далее
          </CustomButton>
        </Card>
      </div>
      <SkillsModal
        skills={skills}
        onClose={(skills) => setSkills(skills)}
        resumeId={resumeId}
      />
    </MotionTab>
  );
};

export default SkillsTab;
