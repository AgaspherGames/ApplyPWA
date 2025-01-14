import {
  ICreateResumeRequest,
  IResume,
  ResumeApi,
} from "@/subapps/practice/entities/resume";
import WorkExperienceCard from "@/subapps/practice/widgets/WorkExperienceCard";
import {
  IonIcon,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import {
  chevronDown,
  ellipsisVerticalOutline,
  eyeOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SkillCard from "@/subapps/practice/widgets/SkillCard";
import { RESUME_STATUS } from "@/subapps/practice/shared/utils/StatusUtils";
import { twMerge } from "tailwind-merge";
import WorkExperienceModal from "../../WorkExperienceModal";
import SkillsModal from "../../SkillsModal";
import ResumeCityInput from "../../ResumeInputs/ResumeCityInput";
import { CustomButton } from "@agaspher/apply.ui-kit";
import ResumeImageButton from "./ResumeImageButton";
import SetResumeStatusModal from "../../SetResumeStatusModal";
import * as yup from "yup";
import VE from "@/shared/utils/ValidationErrors";
import makeResumeRequest from "../utils/makeResumeRequest";
import UpdatebleInput from "../../ResumeInputs/UpdatebleInput";
import ResumeViewsModal from "@/subapps/practice/widgets/ResumeViewsModal";
interface ResumeFormProps {}

function emailValidate(value?: string) {
  if (!value) return "Поле не может быть пустым";
  let error;
  try {
    yup
      .string()
      .email(VE.email)
      .required("Поле не может быть пустым")
      .validateSync(value);
  } catch (_err) {
    let err: any = _err;
    if (err.message) {
      error = err.message;
    }
  }

  if (error) {
    return error;
  }
  return;
}

function validate(value?: string) {
  if (!value) return "Поле не может быть пустым";
  return;
}

const ResumeForm: React.FC<ResumeFormProps> = () => {
  const [resume, setResume] = useState<IResume>();
  const [isNameOpen, setIsNameOpen] = useState(false);
  const [viewsCount, setViewsCount] = useState(0);
  useEffect(() => {
    fetchResume();
  }, []);
  const { id } = useParams<{ id: string }>();

  async function fetchResume() {
    const res = (await ResumeApi.fetchResume(id)).data;
    const viewsResponse = await ResumeApi.fetchViews(id, { lastDays: 7 });
    setResume(res);
    setViewsCount(viewsResponse.data.views.length);
  }
  const [present] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();

  async function update(data: Partial<ICreateResumeRequest>) {
    if (!resume) return;
    const requestData = makeResumeRequest(resume, data);
    await ResumeApi.updateResume(resume.id, requestData);
    fetchResume();
  }

  if (!resume) return <div></div>;

  return (
    <div className="p-0">
      <ResumeViewsModal resumeId={id} trigger={`show_views_${id}`} />
      <div className="p-4 rounded-lg bg-stone-800 bg-opacity-40">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3
              id="open-status-modal"
              className={twMerge(
                "text-green-500 text-xl font-semibold my-4",
                `${RESUME_STATUS[resume.status].color}`
              )}
            >
              {RESUME_STATUS[resume.status].text}
            </h3>
            <button
              id={`show_views_${id}`}
              className="text-green-500 text-center ml-auto flex items-center h-fit"
            >
              {viewsCount}
              <IonIcon className="ml-2" icon={eyeOutline} />
            </button>
          </div>
          <IonIcon
            onClick={() =>
              present({
                header: "Дополнительно",
                buttons: [
                  {
                    text: "Удалить",
                    role: "destructive",
                    data: {
                      action: "delete",
                    },
                    cssClass: "!text-red-500 !bg-red-950 !bg-opacity-30",
                    handler() {
                      presentAlert({
                        header: "Вы уверены, что хотите удалить данное резюме?",
                        subHeader: "",
                        cssClass: "!rounded-xl",
                        message:
                          "После удаления, вы не сможете восстановить данное резюме.",
                        buttons: [
                          {
                            text: "Отмена",
                            cssClass: "!text-white",
                          },
                          {
                            text: "Удалить",
                            cssClass: "!text-red-500",
                            async handler() {
                              await ResumeApi.deleteResume(resume.id);
                              router.goBack();
                            },
                          },
                        ],
                      });
                    },
                  },
                  {
                    text: "Отмена",
                    role: "cancel",
                    data: {
                      action: "cancel",
                    },
                  },
                ],
              })
            }
            icon={ellipsisVerticalOutline}
            role="button"
          />
        </div>
        <SetResumeStatusModal
          updateData={update}
          resumeId={resume.id}
          status={resume.status}
        />
        <div className="flex">
          <ResumeImageButton
            onChange={fetchResume}
            resumeImage={resume.image}
            resumeId={resume.id}
          />
          <div className="ml-4 flex flex-col w-full">
            <div>
              <UpdatebleInput
                validate={validate}
                value={resume.position}
                onChange={async (value) => {
                  await update({ position: value });
                }}
              />
            </div>
            <div className="items-center flex justify-between">
              <h4
                className={twMerge(
                  "text-stone-400 transition-all ",
                  isNameOpen && "opacity-0"
                )}
              >
                {resume.last_name} {resume.first_name} {resume.middle_name}
              </h4>
              <button
                onClick={() => {
                  setIsNameOpen((p) => !p);
                }}
                id="click-trigger-fio"
                className="rounded-full bg-stone-800 w-6 h-6 ml-1 items-center flex justify-center"
              >
                <IonIcon
                  className={
                    "transition-all " + (isNameOpen ? "rotate-180" : "")
                  }
                  icon={chevronDown}
                />
              </button>
            </div>
          </div>
        </div>
        <div
          className=" grid mt-4 transition-all"
        >
          <div
            className={twMerge(
              "max-h-0 overflow-hidden transition-all",
              isNameOpen && "max-h-64"
            )}
          >
            <UpdatebleInput
              label="Имя"
              validate={validate}
              value={resume.first_name}
              onChange={async (value) => {
                await update({ first_name: value });
              }}
            />
            <UpdatebleInput
              label="Фамилия"
              validate={validate}
              value={resume.last_name}
              onChange={async (value) => {
                await update({ last_name: value });
              }}
            />
            <UpdatebleInput
              label="Отчество"
              validate={validate}
              value={resume.middle_name}
              onChange={async (value) => {
                await update({ middle_name: value });
              }}
            />
          </div>
          <div className="mt-4">
            <UpdatebleInput
              label="Рабочая почта"
              placeholder="user@mail.com"
              validate={emailValidate}
              value={resume.email}
              onChange={async (value) => {
                await update({ email: value });
              }}
            />
            <UpdatebleInput
              label="Дата рождения"
              type="date"
              placeholder="18.08.2005"
              validate={validate}
              value={resume.birthday.split("T")[0]}
              onChange={async (value) => {
                if (value)
                  await update({ birthday: new Date(value).toISOString() });
              }}
            />
            <ResumeCityInput updateData={update} value={resume.city.id + ""} />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold ">
              {!resume.experience.length ? "Без опыта работы" : "Опыт работы"}
            </h2>
            <CustomButton
              id="add-resume-work-experience"
              className="p-0 bg-transparent underline"
            >
              Добавить
            </CustomButton>
            <WorkExperienceModal
              trigger="add-resume-work-experience"
              resumeId={resume.id}
              onSave={() => {
                fetchResume();
              }}
              onDelete={fetchResume}
            />
          </div>
          {resume.experience.map((experince) => (
            <WorkExperienceCard
              onDelte={fetchResume}
              onUpdate={fetchResume}
              resumeId={resume.id}
              experience={experince}
              key={experince.id}
            />
          ))}
        </div>
        <div className="grid gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold ">
              {!resume.skills.length ? "Без навыков" : "Навыки"}
            </h2>
            <CustomButton
              id="open-resume-skills-modal"
              className="p-0 bg-transparent underline"
            >
              Редактировать
            </CustomButton>
            <SkillsModal
              trigger="open-resume-skills-modal"
              skills={resume.skills}
              onClose={(skills) => fetchResume()}
              resumeId={resume.id}
            />
          </div>

          {resume.skills.map((skill) => (
            <SkillCard skill={skill} key={skill.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
