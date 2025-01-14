import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import { Card, CustomButton, Title } from "@agaspher/apply.ui-kit";
import {
  IonAvatar,
  IonContent,
  IonFooter,
  IonModal,
  IonRippleEffect,
  IonTextarea,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import "./CreateApplicationModal.css";
import ScrollShadow from "@/subapps/practice/shared/ui/ScrollShadow";
import { IResume, useResumeStore } from "@/subapps/practice/entities/resume";
import SelectUserResume from "./SelectUserResume";
import { useErrorToast, useInfoToast } from "@/shared/utils/toastHooks";
import { ApplicationApi } from "@/subapps/practice/entities/application";
import { useAsync } from "@/shared/utils/hooks";
import axios from "axios";
import NoResumeModal from "./NoResumeModal";

interface CreateApplicationModalProps {
  trigger: string;
  internshipId: string;
}

const CreateApplicationModal: React.FC<CreateApplicationModalProps> = ({
  trigger,
  internshipId,
}) => {
  const ref = useRef<HTMLIonModalElement>(null);
  const { userResumes } = useResumeStore();
  const [isSelectResumeOpen, setIsSelectResumeOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<IResume | undefined>(
    userResumes[0] || undefined
  );

  useEffect(() => {
    setResume(userResumes[0] || undefined);
  }, [userResumes]);

  const showErrorToast = useErrorToast();

  const { call: create, status } = useAsync(createApplication);

  const showInfoToast = useInfoToast();

  async function createApplication() {
    if (resume) {
      try {
        const requestBody: {
          internship_id: string;
          resume_id: string;
          cover_letter?: string;
        } = {
          internship_id: internshipId,
          resume_id: resume?.id,
          cover_letter: coverLetter,
        };
        if (!coverLetter) {
          delete requestBody.cover_letter;
        }
        await ApplicationApi.createApplication(requestBody);
        showInfoToast("Отклик отправлен успешно");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data.message == "already exists") {
            showErrorToast("Вы уже откликнулись на эту стажировку");
          }
        } else {
          showErrorToast("Неизвестная ошибка, попробуйте позже");
        }
      }
    } else {
      showErrorToast("Выберите резюме");
    }
    ref.current?.dismiss();
  }

  if (!userResumes.length) {
    return <NoResumeModal trigger={trigger} />;
  }

  return (
    <IonModal
      ref={ref}
      className="ion-application-modal ion-transparent-bg bg-black bg-opacity-40 "
      trigger={trigger}
    >
      <IonContent
        onClick={(e) => {
          ref.current?.dismiss();
          e.stopPropagation();
        }}
        className="ion-transparent-bg overflow-hidden"
      />
      <IonFooter onClick={(e) => e.stopPropagation()}>
        <SelectUserResume isOpen={isSelectResumeOpen} onSelect={setResume} />
        <Card
          onClick={(e) => e.stopPropagation()}
          className="h-full bg-stone-900 bg-opacity-90"
        >
          {resume ? (
            <div
              onClick={() => {
                setIsSelectResumeOpen((p) => !p);
              }}
              className="flex gap-2 border-b border-stone-500 pb-2"
            >
              <IonAvatar className="w-10 h-10">
                <img src={getFileLink(resume?.image, "avatar")} />
              </IonAvatar>
              <div>
                <p className="text-stone-500 leading-none">
                  Резюме для отклика
                </p>
                <p className="text-lg text-white ">{resume?.position}</p>
              </div>
            </div>
          ) : (
            <div>Выберите резюме</div>
          )}
          <ScrollShadow className="max-h-64 w-full py-1">
            <label
              htmlFor="input"
              className="focus:fixed focus:inset-0 bg-red-500"
            >
              <IonTextarea
                id="input"
                className="h-fit"
                autoGrow
                rows={5}
                onTouchMove={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                value={coverLetter}
                onIonInput={(e) => setCoverLetter(e.target.value || "")}
                onTouchMoveCapture={(e) => e.stopPropagation()}
                placeholder="Сопроводительное письмо..."
              />
            </label>
          </ScrollShadow>
          <button
            disabled={status == "pending"}
            onClick={create}
            className="rounded-lg relative bg-green-500 text-white text-lg px-4 w-full py-1 ion-activatable overflow-hidden mt-4"
          >
            {status == "pending" ? "Отклик отправлен" : "Откликнуться"}
            <IonRippleEffect></IonRippleEffect>
          </button>
        </Card>
      </IonFooter>
    </IonModal>
  );
};

export default CreateApplicationModal;
