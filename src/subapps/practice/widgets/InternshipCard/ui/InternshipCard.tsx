import { Card } from "@agaspher/apply.ui-kit";
import StarButton from "@/subapps/practice/features/StarButton";
import {
  IonAvatar,
  IonCardTitle,
  IonIcon,
  IonLabel,
  IonRippleEffect,
  useIonRouter,
} from "@ionic/react";
import React, { useId } from "react";
import { locationOutline, walletOutline } from "ionicons/icons";
import { Internship } from "@/subapps/practice/entities/internship";
import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import { useRelLinks } from "@/shared/utils/hooks";
import InternshipProgressBar from "../../InternshipProgressBar";
import CreateApplicationModal from "@/subapps/practice/features/CreateApplicationModal";
interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  const router = useIonRouter();
  const [link] = useRelLinks(["internship/" + internship.id]);
  const id = useId();
  return (
    <Card
      onClick={() => {
        router.push(link);
      }}
    >
      <div className=" flex justify-between">
        <div className="flex items-center gap-2">
          <IonCardTitle class="text-2xl">{internship.name}</IonCardTitle>
        </div>
        <StarButton internship={internship} />
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="flex items-center my-1 gap-1 ">
          <IonAvatar class="w-6 h-6">
            <img
              src={getFileLink(internship.company.avatar, "avatar")}
              className="aspect-square object-cover w-6 h-6"
              alt=""
            />
          </IonAvatar>
          <IonLabel className="">{internship.company.name}</IonLabel>
        </div>
        <div className="w-fit flex items-center text-zinc-500">
          <IonIcon className="mr-1" icon={locationOutline} />{" "}
          <p className="line-clamp-1">{internship.city.name}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-2 md:flex-row">
        {internship.is_paid ? (
          <Card className="text-green-500 flex gap-2 items-center py-2 w-min">
            <IonIcon icon={walletOutline} />
            <p>Оплачиваемая</p>
          </Card>
        ) : (
          <Card className="text-zinc-500 flex gap-2 items-center py-2 w-min">
            <IonIcon icon={walletOutline} />
            <p>Неоплачиваемая</p>
          </Card>
        )}
        <InternshipProgressBar
          interns={5}
          maxInterns={internship.max_interns}
        />
      </div>
      <p className="mt-3 line-clamp-3">{internship.description}</p>
      <div className="w-full overflow-scroll">
        <div className="flex gap-2 mt-2 w-max ">
          {internship.keywords.map((word, ind) => (
            <Card key={ind} className="w-fit py-1.5 px-3">
              {word}
            </Card>
          ))}
        </div>
      </div>
      <button
        id={id}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="rounded-lg relative bg-green-500 text-white text-lg px-4 w-full py-1 ion-activatable overflow-hidden mt-4"
      >
        Откликнуться
        <IonRippleEffect></IonRippleEffect>
      </button>
      <CreateApplicationModal internshipId={internship.id} trigger={id} />
    </Card>
  );
};

export default InternshipCard;
