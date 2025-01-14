import RelLink from "@/shared/components/RelLink";
import { useFavoriteStore } from "@/subapps/practice/entities/favorite";
import InternshipCard from "@/subapps/practice/widgets/InternshipCard";
import { CustomButton, Title } from "@agaspher/apply.ui-kit";
import {
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { footstepsOutline } from "ionicons/icons";
import React from "react";
interface FavoritesPageProps {}

const FavoritesPage: React.FC<FavoritesPageProps> = () => {
  const { favorites } = useFavoriteStore();

  return (
    <IonPage>
      <IonContent class="ion-padding">
        <div>
          <Title className=" mb-4 text-2xl">Избранные стажировки</Title>
          {favorites.length ? (
            <div className=" grid gap-4">
              {favorites.map((internship) => (
                <InternshipCard internship={internship} key={internship.id} />
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <IonIcon
                  icon={footstepsOutline}
                  className="w-1/2 h-1/2  aspect-square"
                />
              </div>
              <Title className="text-center text-balance text-2xl my-8 font-normal">
                Вы не выбрали ни одной стажировки
              </Title>
              <RelLink className="" to={"home"}>
                <CustomButton className="w-full ">
                  Найти стажировку
                </CustomButton>
              </RelLink>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FavoritesPage;
