import {
  useIonRouter,
} from "@ionic/react";
import {
  lockClosedOutline,
  mailOutline,
  personOutline,
} from "ionicons/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import VE from "@/shared/utils/ValidationErrors";
import { AuthApi, SignUpRequest } from "@/entities/auth";
import { useAsync } from "@/shared/utils/hooks";
import axios from "axios";
import { CustomInput } from "@agaspher/apply.ui-kit";
import { useErrorToast } from "@/shared/utils/toastHooks";
interface RegisterFormProps {}

const schema = yup
  .object({
    email: yup.string().required(VE.required).email(VE.email),
    password: yup.string().required(VE.required).min(8, VE.minPassword(8)),
    first_name: yup.string().required(VE.required),
    last_name: yup.string().required(VE.required),
  })
  .required();

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequest>({ resolver: yupResolver(schema) });

  const router = useIonRouter();

  const signUpRequest = useAsync(AuthApi.signUp);

  const showErrorToast = useErrorToast();

  const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    const resp = await signUpRequest.call(data);
    resp && router.push("/", "none", "replace");
  };

  const signUpErrors = useMemo(() => {
    const errors: {
      email?: string;
      password?: string;
      first_name?: string;
      last_name?: string;
    } = {};
    if (!signUpRequest.error) return errors;
    if (axios.isAxiosError(signUpRequest.error)) {
      if (signUpRequest.error.response?.data.message == "invalid credentials") {
        errors.email = "Неправильная почта или пароль!";
      } else if (signUpRequest.error.response?.data.message == "bad request") {
        errors.email = VE.email;
      } else {
        showErrorToast("Неизвестная ошибка, попробуйте позже.");
      }
    }
    return errors;
  }, [signUpRequest.error]);

  const [isMidNameOpen, setIsMidNameOpen] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 ">
        <CustomInput
          className="mb-4 xs:mb-6"
          placeholder="Иван"
          error={errors.email?.message}
          icon={personOutline}
          label="Имя"
          src="/icons/FA/1-solid.svg"
          {...register("first_name")}
        />
        <CustomInput
          className="mb-4 xs:mb-6"
          placeholder="Иванов"
          src="/icons/FA/2-solid.svg"
          error={errors.last_name?.message}
          label="Фамилия"
          {...register("last_name")}
        />
      </div>
      <CustomInput
        className="mb-4 xs:mb-6"
        placeholder="user@mail.com"
        error={errors.email?.message || signUpErrors.email}
        icon={mailOutline}
        label="Email"
        {...register("email")}
      />
      <CustomInput
        className="mb-4 xs:mb-6"
        placeholder="********"
        icon={lockClosedOutline}
        error={errors.password?.message}
        type="password"
        label="Пароль"
        {...register("password")}
      />
      <div className="w-full flex justify-end">
        <button
          disabled={signUpRequest.status == "pending"}
          className="w-full text-lg font-semibold text-white bg-gradient-to-r 
          from-green-400 
          to-green-500 
          via-green-600
          animate-gradient-x
           rounded-lg py-2 px-12 disabled:opacity-50"
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
