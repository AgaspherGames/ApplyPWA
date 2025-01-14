import { IUpdateUser, UserApi, useUserStore } from "@/entities/user";
import * as yup from "yup";
import VE from "@/shared/utils/ValidationErrors";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomButton, CustomInput } from "@agaspher/apply.ui-kit";

const schema = yup
  .object({
    first_name: yup.string().required(VE.required),
    last_name: yup.string().required(VE.required),
    middle_name: yup.string().optional(),
  })
  .required();

interface EditProfileFormProps {}

const EditProfileForm: React.FC<EditProfileFormProps> = () => {
  const [user, setUser] = useUserStore((state) => [
    state.user,
    state.setUser,
    state.updateUser,
  ]);

  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setValue("middle_name", user.middle_name);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateUser>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IUpdateUser> = async (data) => {
    await UserApi.updateUser(data);
    setUser();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        {...register("first_name")}
        error={errors.first_name?.message}
        label="Имя"
      />
      <CustomInput
        {...register("last_name")}
        error={errors.last_name?.message}
        label="Фамилия"
      />
      <CustomInput
        {...register("middle_name")}
        error={errors.middle_name?.message}
        label="Отчество"
      />
      <CustomButton>Сохранить</CustomButton>
    </form>
  );
};

export default EditProfileForm;
