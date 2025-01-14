import {
  IonContent,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import React, { useMemo } from "react";
import AvatarModal from "@/features/AvatarModal";
import ProfileMenu from "@/widgets/ProfileMenu";
import { useUserStore } from "@/entities/user";
import {
  LoadingScreen,
} from "@agaspher/apply.ui-kit";
import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import { AuthApi } from "@/entities/auth";
interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { user, setUser } = useUserStore((state) => state);

  const parsedName = useMemo(() => {
    return `${user?.first_name} ${user?.last_name[0] || ""}`;
  }, [user]);

  async function logout() {
    await AuthApi.logout();
    window.location.replace("/");
  }

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <IonPage>
      <IonContent className="">
        <AvatarModal />

        <IonRefresher
          slot="fixed"
          onIonRefresh={async (event: CustomEvent<RefresherEventDetail>) => {
            await setUser();
            event.detail.complete();
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="relative inset-0 h-full flex flex-col overflow-x-hidden ">
          <div className="flex justify-center pt-8">
            <div
              id="open-avatar-modal"
              className="box-border w-24 bg-stone-600 rounded-full overflow-hidden"
            >
              <img
                src={getFileLink(user?.avatar, "avatar")}
                alt=""
                className="w-full aspect-square"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold">С возвращением!</h2>
              <p className="text-lg text-zinc-500">{parsedName}</p>
            </div>
          </div>
          <div className="relative">
            <ProfileMenu />
          </div>
          <button
            onClick={logout}
            className="absolute top-4 right-4 text-stone-400"
          >
            <IonIcon role="button" icon={logOutOutline} className="w-6 h-6" />
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
