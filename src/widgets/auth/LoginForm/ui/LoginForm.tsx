import { useIonRouter } from "@ionic/react";
import { lockClosedOutline, mailOutline } from "ionicons/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import VE from "@/shared/utils/ValidationErrors";
import { AuthApi, SignInRequest } from "@/entities/auth";
import { useAsync } from "@/shared/utils/hooks";
import axios from "axios";
import { CustomInput } from "@agaspher/apply.ui-kit";
import { useErrorToast } from "@/shared/utils/toastHooks";

interface LoginFormProps {}

const schema = yup
  .object({
    email: yup.string().required(VE.required).email(VE.email),
    password: yup.string().required(VE.required).min(8, VE.minPassword(8)),
  })
  .required();

const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>({ resolver: yupResolver(schema) });

  const router = useIonRouter();

  const signInRequest = useAsync(AuthApi.signIn);

  const showErrorToast = useErrorToast();

  const onSubmit: SubmitHandler<SignInRequest> = async (data) => {
    const resp = await signInRequest.call(data);
    console.log(resp);

    if (resp) {
      router.push("/main/home", "none", "replace");
    }
  };

  const signInErrors = useMemo(() => {
    const errors: { email?: string; password?: string } = {};
    if (!signInRequest.error) return errors;
    if (axios.isAxiosError(signInRequest.error)) {
      console.log(signInRequest.error);
      if (signInRequest.error.response?.data.message == "invalid credentials") {
        errors.email = "Неправильная почта или пароль!";
      } else if (signInRequest.error.response?.data.message == "not found") {
        errors.email = "Неправильная почта или пароль!";
      } else {
        showErrorToast("Неизвестная ошибка, попробуйте позже.");
      }
    }
    return errors;
  }, [signInRequest.error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        placeholder="user@mail.com"
        className="xs:mb-10"
        error={errors.email?.message || signInErrors?.email}
        icon={mailOutline}
        label="Email"
        {...register("email")}
      />
      <CustomInput
        placeholder="********"
        className="xs:mb-10"
        icon={lockClosedOutline}
        error={errors.password?.message}
        type="password"
        label="Пароль"
        {...register("password")}
      />

      <div className="w-full flex justify-end mb-4">
        <button
          disabled={signInRequest.status == "pending"}
          className="w-full text-lg font-semibold text-white bg-gradient-to-r 
          from-green-400 
          to-green-500 
          via-green-600
          animate-gradient-x
           rounded-lg py-2 px-12 disabled:opacity-50"
        >
          Войти
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
