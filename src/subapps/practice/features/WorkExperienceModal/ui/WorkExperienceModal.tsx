import { IonModal } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import VE from "@/shared/utils/ValidationErrors";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ICreateExperience,
  IExperience,
  ResumeApi,
} from "@/subapps/practice/entities/resume";
import { useAsync } from "@/shared/utils/hooks";
import {
  BackButton,
  Title,
  CustomInput,
  CustomTextarea,
  CustomButton,
} from "@agaspher/apply.ui-kit";
import { DateTime } from "luxon";

const schema = yup
  .object({
    position: yup.string().required(VE.required).min(4, VE.minLength(4)),
    start_date: yup.string().required(VE.required),
    end_date: yup.string().when("start_date", ([startDate], schema) => {
      return schema.test({
        test: function (endDate) {
          console.log(startDate);

          const startDateObj = new Date(startDate);
          const endDateObj = endDate ? new Date(endDate) : null;

          return endDateObj === null || endDateObj > startDateObj;
        },
        message: "Дата окончания стажировки должна быть после даты начала",
      });
    }),
    company: yup.string().required(VE.required).min(2, VE.minLength(2)),
    description: yup.string().required(VE.required).max(80, VE.maxLength(80)),
  })
  .required();

interface WorkExperienceModalProps {
  onSave: (experience: IExperience) => void;
  onDelete: (experience: IExperience) => void;
  resumeId: string;
  trigger?: string;
  experience?: IExperience;
}

const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({
  onSave,
  onDelete,
  resumeId,
  trigger = "add-work-experience",
  experience,
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ICreateExperience>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (experience) {
      setValue("company", experience.company);
      setValue("description", experience.description);
      setValue("position", experience.position);
      setValue(
        "start_date",
        DateTime.fromISO(experience.start_date).toFormat("yyyy-MM-dd")
      );
      setValue(
        "end_date",
        experience.end_date
          ? DateTime.fromISO(experience.end_date).toFormat("yyyy-MM-dd")
          : ""
      );
    }
  }, [experience]);

  async function createExperience(data: ICreateExperience) {
    data.start_date = new Date(data.start_date).toISOString();
    if (data.end_date) data.end_date = new Date(data.end_date).toISOString();
    const { id } = (await create(data)).data;
    onSave({ ...data, id });
    reset({
      company: "",
      description: "",
      end_date: "",
      position: "",
      start_date: "",
    });
  }
  async function saveExperience(data: ICreateExperience) {
    if (!experience) return;
    data.start_date = new Date(data.start_date).toISOString();
    if (data.end_date) data.end_date = new Date(data.end_date).toISOString();
    const responseData = { ...experience, ...data };
    await edit(responseData);
    onSave(responseData);
  }
  async function deleteExperience() {
    if (!experience) return;
    await deleteExp(experience.id);
    onDelete(experience);
    modalRef.current?.dismiss();
  }

  const onSubmit: SubmitHandler<ICreateExperience> = async (data) => {
    experience ? saveExperience(data) : createExperience(data);
    modalRef.current?.dismiss();
  };

  const { call: create, status } = useAsync(
    async (experience: ICreateExperience) => {
      return ResumeApi.createExperience(resumeId, experience);
    }
  );
  const { call: deleteExp, status: deleteStatus } = useAsync(
    async (id: string) => {
      return ResumeApi.deleteExperience(resumeId, id);
    }
  );
  const { call: edit, status: editStatus } = useAsync(
    async (experience: IExperience) => {
      return ResumeApi.updateExperience(resumeId, experience.id, {
        company: experience.company,
        description: experience.description,
        end_date: experience.end_date,
        start_date: experience.start_date,
        position: experience.position,
      });
    }
  );

  return (
    <IonModal trigger={trigger} ref={modalRef}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full bg-stone-800 bg-opacity-40 p-4"
      >
        <BackButton
          back={() => {
            modalRef.current?.dismiss();
          }}
        />
        <Title className="ml-8 mb-4">Опыт работы</Title>
        <CustomInput
          error={errors.position?.message}
          {...register("position")}
          label="Занимаемая должность"
        />
        <h3 className="text-red-600 text-sm">
          {errors.end_date?.message || errors.start_date?.message}
        </h3>
        <div className="flex gap-4 items-center">
          <CustomInput
            {...register("start_date")}
            type="date"
            label="Начало работы"
          />
          —
          <div className="w-full relative">
            <CustomInput
              className="custom-input"
              {...register("end_date")}
              label="Окончание"
              type="date"
              data-placeholder="Еще работаю"
            />
          </div>
        </div>
        <CustomInput
          error={errors.company?.message}
          {...register("company")}
          label="Название организации"
        />
        <CustomTextarea
          rows={12}
          error={errors.description?.message}
          {...register("description")}
          label="Обязанности, опыт и полученные знания"
        />
        <div className="flex gap-2">
          <CustomButton
            disabled={
              status == "pending" ||
              editStatus == "pending" ||
              deleteStatus == "pending"
            }
          >
            Сохранить
          </CustomButton>
          {experience && (
            <CustomButton
              type="button"
              onClick={deleteExperience}
              className="bg-red-500 hover:bg-red-600"
              disabled={
                status == "pending" ||
                editStatus == "pending" ||
                deleteStatus == "pending"
              }
            >
              Удалить
            </CustomButton>
          )}
        </div>
      </form>
    </IonModal>
  );
};

export default WorkExperienceModal;
