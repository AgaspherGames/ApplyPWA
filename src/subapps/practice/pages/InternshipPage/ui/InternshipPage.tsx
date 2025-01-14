import RelLink from "@/shared/components/RelLink";
import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import {
  Internship,
  InternshipApi,
} from "@/subapps/practice/entities/internship";
import CreateApplicationModal from "@/subapps/practice/features/CreateApplicationModal";
import StarButton from "@/subapps/practice/features/StarButton";
import InternshipProgressBar from "@/subapps/practice/widgets/InternshipProgressBar";
import { BackButton, Card, LoadingScreen, Title } from "@agaspher/apply.ui-kit";
import {
  IonAvatar,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRippleEffect,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  arrowDownOutline,
  locationOutline,
  pencilOutline,
  walletOutline,
} from "ionicons/icons";
import { DateTime } from "luxon";
import React, { useEffect, useId, useState } from "react";
import { useParams } from "react-router";
interface InternshipPageProps {}

const InternshipPage: React.FC<InternshipPageProps> = () => {
  const [internship, setInternship] = useState<Internship>();
  const { id } = useParams<{ id: string }>();

  async function loadInternship() {
    const internship = (await InternshipApi.getInternshipById(id)).data;
    setInternship(internship);
  }

  useEffect(() => {
    loadInternship();
  }, []);
  const router = useIonRouter();
  const createApplicationId = useId();

  if (!internship) return <LoadingScreen />;
  return (
    <IonPage>
      <IonContent className="">
        <IonHeader className="fixed inset-x-0">
          <IonToolbar class="ion-transparent-bg backdrop-blur-md bg-black bg-opacity-20">
            <div className="flex justify-between w-full items-center h-min pl-2 pr-4 ">
              <BackButton
                className="static flex items-center justify-center"
                back={() => {
                  router.goBack();
                }}
              />
              <StarButton internship={internship} className="h-6" />
            </div>
          </IonToolbar>
        </IonHeader>
        <Card className="group relative m-4 mt-12">
          <div className=" flex justify-between">
            {internship.is_active ? (
              <p className="w-fit flex items-center text-lg text-green-500">
                Активно
              </p>
            ) : (
              <p className="w-fit flex items-center text-lg text-red-500">
                Неактивно
              </p>
            )}
            <div className="flex gap-2">
              <p className="w-fit flex items-center text-zinc-500 ">
                <IonIcon className="mr-1" icon={locationOutline} />{" "}
                {internship.city.name}
              </p>

              <p className="w-fit flex items-center text-zinc-500 ">
                {DateTime.fromISO(internship.created_at).toFormat("dd.MM.yyyy")}
              </p>
            </div>
          </div>
          <Title className="text-3xl">{internship.name}</Title>
          <RelLink
            to={"company/" + internship.company.id}
            className="flex items-center my-1 gap-1 "
          >
            <IonAvatar class="w-6 h-6">
              <img
                className="w-6 h-6"
                src={getFileLink(internship.company.avatar, "avatar")}
                alt=""
              />
            </IonAvatar>
            <IonLabel className="text-base text-stone-400">
              {internship.company.name}
            </IonLabel>
          </RelLink>

          <div className="flex flex-col gap-4 my-4">
            {internship.is_paid ? (
              <Card className="text-green-500 flex gap-2 items-center py-2 w-fit">
                <IonIcon icon={walletOutline} />
                <p>Оплачиваемая</p>
              </Card>
            ) : (
              <Card className="text-zinc-500 flex gap-2 items-center py-2 w-fit">
                <IonIcon icon={walletOutline} />
                <p>Неоплачиваемая</p>
              </Card>
            )}
            <InternshipProgressBar
              interns={1}
              maxInterns={internship.max_interns}
            />
          </div>

          <p className="whitespace-pre-wrap">{internship.description}</p>
          {/* TODO */}
          {internship.attachment && (
            <a href={getFileLink(internship.attachment)} target="_blank">
              <Card
                role="button"
                className=" py-2 px-4 gap-1 items-center flex w-fit  my-4"
              >
                <p>Информация о стажировке.pdf</p>
                <IonIcon icon={arrowDownOutline} />
              </Card>
            </a>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {internship.keywords.map((word) => (
              <Card key={word} className="w-fit py-1 px-3">
                {word}
              </Card>
            ))}
          </div>
        </Card>
      </IonContent>
      <IonFooter>
        <IonToolbar className="px-4 ">
          <button
            id={createApplicationId}
            className="rounded-lg relative bg-green-500 text-white text-lg px-4 w-full py-1 ion-activatable overflow-hidden font-medium"
          >
            Откликнуться
            <IonRippleEffect></IonRippleEffect>
          </button>
        </IonToolbar>
      </IonFooter>
      <CreateApplicationModal
        trigger={createApplicationId}
        internshipId={internship.id}
      />
    </IonPage>
  );
};

export default InternshipPage;
