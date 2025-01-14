import React, { useState } from "react";
import "./index.css";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { AuthApi } from "@/entities/auth";
import { useEffectOnce } from "usehooks-ts";
import { IonModal, IonSpinner, useIonRouter } from "@ionic/react";
import { useErrorToast } from "@/shared/utils/toastHooks";
interface LoginWithGoogleProps {}

const LoginWithGoogle: React.FC<LoginWithGoogleProps> = () => {
  useEffectOnce(() => {
    GoogleAuth.initialize({
      clientId: import.meta.env.VITE_BACKEND_URL,
      scopes: ["profile", "email"],
      grantOfflineAccess: false,
    });
  });

  const router = useIonRouter();
  const showErrorToast = useErrorToast();
  const [isLoading, setIsLoading] = useState(false);

  async function login() {
    try {
      setIsLoading(true);
      const user = await GoogleAuth.signIn();

      const resp = await AuthApi.googleSignIn(user.authentication.accessToken);

      if (resp) {
        router.push("/main/home", "none", "replace");
      } else {
        throw new Error("No google auth response");
      }
    } catch (error) {
      showErrorToast("Ошибка входа через Google, попробуйте позже");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={login}
        type="button"
        className="login-with-google-btn flex items-center"
      >
        <img
          className="-ml-6"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
        />
        Войти через Google
      </button>
      <IonModal className="ion-transparent-bg" isOpen={isLoading}>
        <div className="flex items-center justify-center h-full">
          <IonSpinner name="dots" class="w-24 h-24" />
        </div>
      </IonModal>
    </>
  );
};

export default LoginWithGoogle;
