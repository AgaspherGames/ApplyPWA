import { useKeyboard } from "@/shared/utils/hooks";
import { CustomInput, CustomTextarea, CustomButton } from "@agaspher/apply.ui-kit";
import { close, mailOutline } from "ionicons/icons";
import React from "react";
interface HelpFormProps {}

const HelpForm: React.FC<HelpFormProps> = () => {
  const isOpen = useKeyboard();
  return (
    <>
      {!isOpen && (
        <>
          <h2 className="text-xl font-medium">Мы всегда рады вам помочь</h2>
          <p>
            Вы можете написать нам на{" "}
            <a
              className="text-blue-500 underline"
              href="mailto:vladloh@mail.com"
            >
              почту
            </a>{" "}
            или оставить вопрос на в форме ниже, указав вашу проблему и почту,
            на которую придет ответ.
          </p>
        </>
      )}
      <form className="mt-4" action="">
        <CustomInput icon={mailOutline} label="Почта" />
        <CustomInput icon={close} label="Проблема" />
        <CustomTextarea rows={5} label="Описание проблемы" />
        <CustomButton>Отправить</CustomButton>
      </form>
    </>
  );
};

export default HelpForm;
