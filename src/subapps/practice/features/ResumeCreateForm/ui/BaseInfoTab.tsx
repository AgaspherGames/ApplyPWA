import React, { useState } from "react";
import MotionTab from "./MotionTab";
import CityInput from "../../CityInput";
import * as yup from "yup";
import VE from "@/shared/utils/ValidationErrors";
import { useUserStore } from "@/entities/user";
import {
  ICreateResumeRequest,
  ResumeApi,
} from "@/subapps/practice/entities/resume";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAsync } from "@/shared/utils/hooks";
import { ResumeContext } from "./ResumeCreateForm";
import {
  Card,
  CustomInput,
  CustomTextarea,
  CustomButton,
} from "@agaspher/apply.ui-kit";
import { IonContent, IonPopover } from "@ionic/react";

interface BaseInfoTabProps {
  tab: number;
  setTab: (tab: number) => void;
  setResumeId: (id: string) => void;
}

type ShortCreateResumeRequest = Omit<
  ICreateResumeRequest,
  "first_name" | "last_name" | "middle_name" | "city_id"
>;

const schema = yup
  .object({
    position: yup.string().required(VE.required),
    email: yup.string().required(VE.required).email(VE.email),
    birthday: yup.string().required(VE.required),
    description: yup.string().required(VE.required),
  })
  .required();

const BaseInfoTab: React.FC<BaseInfoTabProps> = ({
  tab,
  setTab,
  setResumeId,
}) => {
  const user = useUserStore((state) => state.user);
  const [city_id, setCity] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShortCreateResumeRequest>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const { call: createResume, status } = useAsync(create);

  async function create(userData: ShortCreateResumeRequest) {
    if (!user) return;
    const data: ICreateResumeRequest = {
      ...userData,
      birthday: new Date(userData.birthday).toISOString(),
      first_name: user?.first_name,
      last_name: user?.last_name,
      middle_name: user?.middle_name,
      status: "active_search",
      city_id,
    };
    console.log(data);

    const { id } = (await ResumeApi.createResume(data)).data;
    setResumeId(id);

    setTab(2);
  }

  const onSubmit: SubmitHandler<ShortCreateResumeRequest> = async (data) => {
    createResume(data);
  };

  return (
    <MotionTab activeTab={tab} tab={1}>
      <Card className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div>
            <div className="flex items-center">
              <p className="text-lg">
                {user?.last_name} {user?.first_name} {user?.middle_name}
              </p>
              <button
                id="open-fio-popover"
                onClick={(e) => e.preventDefault()}
                className="rounded-full bg-stone-800 w-5 h-5 ml-1 text-xs"
              >
                ?
              </button>
              <IonPopover trigger="open-fio-popover" triggerAction="click">
                <IonContent>
                  <Card>Информация о ФИО берется из личного кабинета</Card>
                </IonContent>
              </IonPopover>
            </div>
          </div>

          <div className="mt-4">
            <CustomInput
              label="Специальность"
              placeholder="Go разработчик..."
              error={errors.position?.message}
              {...register("position")}
            />
            <CustomInput
              label="Рабочая почта"
              placeholder="user@mail.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <CustomInput
              label="Дата рождения"
              type="date"
              data-placeholder="01.01.2000"
              error={errors.birthday?.message}
              {...register("birthday")}
            />
            <CityInput
              value={city_id}
              onSelect={(item) => setCity(+item.value)}
            />
            <CustomTextarea
              label="Расскажите немного о себе"
              rows={8}
              error={errors.description?.message}
              {...register("description")}
            />
          </div>
          <CustomButton disabled={status == "pending"}>Далее</CustomButton>
        </form>
      </Card>
    </MotionTab>
  );
};

export default BaseInfoTab;
