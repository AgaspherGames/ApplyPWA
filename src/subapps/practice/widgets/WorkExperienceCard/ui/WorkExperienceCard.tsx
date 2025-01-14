import { IExperience } from "@/subapps/practice/entities/resume";
import React, { useId, useMemo } from "react";
import { DateTime } from "luxon";
import { wordForm } from "@/shared/utils/WordFormUtil";
import { Card, CustomButton } from "@agaspher/apply.ui-kit";
import WorkExperienceModal from "@/subapps/practice/features/WorkExperienceModal";
interface WorkExperienceCardProps {
  experience: IExperience;
  onUpdate: (experience: IExperience) => void;
  onDelte: (experience: IExperience) => void;
  resumeId: string;
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({
  experience,
  resumeId,
  onUpdate,
  onDelte,
}) => {
  const triggerId = useId();
  const totalTime = useMemo(() => {
    const startDateTime = DateTime.fromISO(experience.start_date);
    const endDateTime = experience.end_date
      ? DateTime.fromISO(experience.end_date)
      : DateTime.now();

    const yearsDiff = endDateTime.diff(startDateTime, "years").years;
    const monthsDiff = endDateTime.diff(startDateTime, "months").months;

    const years = Math.floor(Math.abs(yearsDiff));
    const months = Math.floor(Math.abs(monthsDiff)) % 12;
    const yearString = years
      ? `${years} ${wordForm(years, ["год", "года", "лет"])} `
      : "";
    const monthString = months
      ? `${months} ${wordForm(months, ["месяц", "месяца", "месяцев"])}`
      : "";

    return yearString + monthString || "Меньше месяца";
  }, [experience]);

  const startDateString = useMemo(() => {
    return DateTime.fromISO(experience.start_date)
      .setLocale("ru")
      .toFormat("d MMMM yyyy");
  }, [experience]);
  const endDateString = useMemo(() => {
    if (!experience.end_date) return "Еще работаю";
    return DateTime.fromISO(experience.end_date)
      .setLocale("ru")
      .toFormat("d MMMM yyyy");
  }, [experience]);

  return (
    <>
      <Card>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-blue-300">
            {experience.position}
          </h2>
          <p className="text-stone-400 text-sm">({totalTime})</p>
        </div>
        <p className="text-stone-400">{experience.company}</p>
        <div>
          <p>{experience.description}</p>
          <div className=" justify-between flex text-lg mt-4">
            <h3 className="font-semibold">{startDateString}</h3>
            <h3 className="font-semibold">—</h3>

            <h3 className="font-semibold">{endDateString}</h3>
          </div>
          <CustomButton
            id={`edit_experience_${experience.id}_${triggerId}`}
            className="mt-4 w-full bg-stone-700"
          >
            Редактировать
          </CustomButton>
        </div>
      </Card>
      <WorkExperienceModal
        onSave={onUpdate}
        onDelete={onDelte}
        resumeId={resumeId}
        experience={experience}
        trigger={`edit_experience_${experience.id}_${triggerId}`}
      />
    </>
  );
};

export default WorkExperienceCard;
