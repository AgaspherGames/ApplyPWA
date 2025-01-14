import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import { useRelLinks } from "@/shared/utils/hooks";
import { ServiceMenuButton } from "@/widgets/ServicesMenu";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { homeOutline, personOutline } from "ionicons/icons";
import React from "react";
import { Route } from "react-router";
interface MainNavigationProps {}

const MainNavigation: React.FC<MainNavigationProps> = () => {
  const [homeLink, profileLink] = useRelLinks(["home", "profile"]);

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route>
            <HomePage />
          </Route>
          <Route exact path={homeLink}>
            <HomePage />
          </Route>
          <Route exact path={profileLink}>
            <ProfilePage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton className="no-text" tab="home" href={homeLink}>
            <IonIcon aria-hidden="true" icon={homeOutline} />
          </IonTabButton>
          <IonTabButton className="no-text" tab="profile" href={profileLink}>
            <IonIcon aria-hidden="true" icon={personOutline} />
          </IonTabButton>
          <IonTabButton tab="services">
            <ServiceMenuButton onlyIcon />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default MainNavigation;
