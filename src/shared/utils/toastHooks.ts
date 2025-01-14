import { useIonToast } from "@ionic/react";

export const useErrorToast = () => {
  const [showToast] = useIonToast();
  return (message: string) => {
    showToast({
      message: message,
      position: "top",
      keyboardClose: true,
      swipeGesture: "vertical",
      duration: 1500,
      translucent: true,
      cssClass: "text-red-50 error-toast ",
    });
  };
};
export const useInfoToast = () => {
  const [showToast] = useIonToast();
  return (message: string) => {
    showToast({
      message: message,
      position: "top",
      color: "primary",
      keyboardClose: true,
      swipeGesture: "vertical",
      duration: 1500,
      cssClass: "text-white",
    });
  };
};
