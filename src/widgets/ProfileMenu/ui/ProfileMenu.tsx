import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";

import React, { useState } from "react";
import ProfileMenuContainer from "./ProfileMenuContainer";
import ProfileMenuButton from "./ProfileMenuButton";
import EditProfileForm from "@/features/EditProfileForm";
import HelpForm from "@/features/HelpForm";
import ProfileMenuTab from "./ProfileMenuTab";
import { Card, CustomInput } from "@agaspher/apply.ui-kit";

interface ProfileMenuProps { }

const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  const [tab, setTab] = useState("menu");

  function closeTab() {
    setTab("menu");
  }

  return (
    <div className="relative mx-4 mt-6 pb-4 mb-6 flex-1">
        <ProfileMenuContainer
          initialOpen
          currentTab={tab}
          tab="menu"
          className="grid grid-cols-1 grid-rows-4 gap-4 text-center w-full"
          closedPos={{ translateX: "-25%", translateY: "-25%" }}
        >
          <ProfileMenuButton
            setTab={() => {
              setTab("edit");
            }}
            image="/icons/3d/profile.png"
            title="Профиль"
            description="Просмотр и редактирование информации о вас"
          />
          <ProfileMenuButton
            setTab={() => {
              setTab("settings");
            }}
            image="/icons/3d/settings.png"
            title="Настройки"
            description="Настройте приложение так, как вам будет удобно"
          />
          <ProfileMenuButton
            setTab={() => {
              setTab("help");
            }}
            image="/icons/3d/chat.png"
            title="Поддержка"
            description="Мы всегда готовы вам помочь"
          />
          <ProfileMenuButton
            setTab={() => {
              setTab("ideas");
            }}
            image="/icons/3d/lamp.png"
            title="Предложения"
            description="Поделитесь своими прекрасными идеями"
          />
        </ProfileMenuContainer>

        <ProfileMenuContainer
          currentTab={tab}
          className="inset-0 h-full"
          tab="edit"
          closedPos={{ translateX: "-25%", translateY: "-25%" }}
        >
          <ProfileMenuTab closeFn={closeTab}>
            <EditProfileForm />
          </ProfileMenuTab>
        </ProfileMenuContainer>
        <ProfileMenuContainer
          currentTab={tab}
          className="inset-0 h-full"
          tab="settings"
          closedPos={{ translateX: "25%", translateY: "-25%" }}
        >
          <Card className="rounded-3xl">
            <IonIcon
              className="absolute right-4 top-3 w-5 h-5"
              onClick={() => {
                setTab("menu");
              }}
              size=""
              icon={close}
            ></IonIcon>
            <CustomInput label="Имя" />
            <CustomInput label="Фамилия" />
            <CustomInput label="Отчество" />
            <button className="rounded-md font-semibold bg-stone-900 px-6 py-2">
              Сохранить
            </button>
          </Card>
        </ProfileMenuContainer>
        <ProfileMenuContainer
          currentTab={tab}
          className="inset-0"
          tab="help"
          closedPos={{ translateX: "-25%", translateY: "25%" }}
        >
          <ProfileMenuTab closeFn={closeTab}>
            <HelpForm />
          </ProfileMenuTab>
        </ProfileMenuContainer>
        <ProfileMenuContainer
          currentTab={tab}
          className="inset-0 h-full"
          tab="ideas"
          closedPos={{ translateX: "25%", translateY: "25%" }}
        >
          <Card className="rounded-3xl">
            <IonIcon
              className="absolute right-4 top-3 w-5 h-5"
              onClick={() => {
                setTab("menu");
              }}
              size=""
              icon={close}
            ></IonIcon>
            <CustomInput label="Имя" />
            <CustomInput label="Фамилия" />
            <CustomInput label="Отчество" />
            <button className="rounded-md font-semibold bg-stone-900 px-6 py-2">
              Сохранить
            </button>
          </Card>
        </ProfileMenuContainer>
    </div>
  );
};

export default ProfileMenu;
