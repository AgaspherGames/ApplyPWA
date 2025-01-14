import { IonIcon, IonTitle } from "@ionic/react";
import {
  cashOutline,
  cogOutline,
  newspaperOutline,
  peopleOutline,
  trendingUpOutline,
} from "ionicons/icons";
import React from "react";
import LanidngSectionItem from "./LanidngSectionItem";
import { Card } from "@agaspher/apply.ui-kit";
interface LandingSectionProps {}

const LandingSection: React.FC<LandingSectionProps> = () => {
  return (
    <Card className="m-4">
      <div className="flex">
        <IonIcon size="large" icon={newspaperOutline} />
        <IonTitle>Стажировки</IonTitle>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-2 mt-4">
        <LanidngSectionItem
          icon={cogOutline}
          gradientFrom="#4338ca"
          gradientTo="#1e1b4b"
          label="Опыт"
        />
        <LanidngSectionItem
          icon={cashOutline}
          gradientFrom="#2dd4bf"
          gradientTo="#022c22"
          label="Вакансии"
          double
        />
        <LanidngSectionItem
          icon={trendingUpOutline}
          gradientFrom="#a78bfa"
          gradientTo="#164e63"
          label="Возможности"
          double
        />
        <LanidngSectionItem
          icon={peopleOutline}
          gradientFrom="#e879f9"
          gradientTo="#4c0519"
          label="Крупные компании"
        />
      </div>
    </Card>
  );
};

export default LandingSection;
