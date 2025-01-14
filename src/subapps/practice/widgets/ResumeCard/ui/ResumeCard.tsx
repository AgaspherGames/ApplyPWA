import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import { useRelLinks } from "@/shared/utils/hooks";
import { IResume } from "@/subapps/practice/entities/resume";
import { RESUME_STATUS } from "@/subapps/practice/shared/utils/StatusUtils";
import { Card } from "@agaspher/apply.ui-kit";
import { useIonRouter } from "@ionic/react";
import React from "react";
import { twMerge } from "tailwind-merge";
interface ResumeCardProps {
  resume: IResume;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
  const router = useIonRouter();
  const [link] = useRelLinks(["resume/" + resume.id]);
  return (
    <Card
      onClick={() => {
        router.push(link);
      }}
    >
      <div className="flex z-10">
        <img
          className="w-20 rounded-lg"
          src={getFileLink(resume.image, "avatar")}
        />
        <div className="ml-4 flex flex-col">
          <h3 className=" text-xl font-semibold ">{resume.position}</h3>
          <h4 className="text-stone-400">
            {resume.first_name} {resume.last_name}
          </h4>
          <div className="flex-1 flex items-end">
            <button className="text-blue-500 underline">Подробнее</button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold">Навыки: </p>
        <div>{resume.skills.map((el) => el.skill_name).join(", ")}</div>
        <h3
          className={twMerge(
            "text-green-500 text-xl font-semibold my-4",
            `${RESUME_STATUS[resume.status].color}`
          )}
        >
          {RESUME_STATUS[resume.status].text}
        </h3>
      </div>
    </Card>
  );
};

export default ResumeCard;
