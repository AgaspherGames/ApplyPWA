import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  fileTrayFullOutline,
  mailOpenOutline,
  searchOutline,
  starOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { Route } from "react-router";
import HomePage from "../pages/HomePage";
import { ServiceMenuButton } from "@/widgets/ServicesMenu";
import { useRelLinks } from "@/shared/utils/hooks";
import ResumesPage from "../pages/ResumesPage";
import ResumePage from "../pages/ResumePage";
import ResumeCreatePage from "../pages/ResumeCreatePage";
import InternshipPage from "../pages/InternshipPage";
import CompanyPage from "../pages/CompanyPage";
import ApplicationsPage from "../pages/ApplicationsPage";
import ChatPage from "../pages/ChatPage";
import { useResumeStore } from "../entities/resume";
import FavoritesPage from "../pages/FavoritesPage/ui/FavoritesPage";
import { useFavoriteStore } from "../entities/favorite/model";
interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [
    homeLink,
    resumesLink,
    resumeCreateLink,
    resumeLink,
    applicationsLink,
    favoritesLink,
    internshipLink,
    companyLink,
    chatLink,
  ] = useRelLinks([
    "home",
    "resume",
    "resume/create",
    "resume/:id",
    "applications",
    "favorites",
    "internship/:id",
    "company/:id",
    "chat/:id",
  ]);

  const { loadUserResumes } = useResumeStore();
  const loadFavorites = useFavoriteStore((state) => state.setFavorites);
  useEffect(() => {
    loadUserResumes();
    loadFavorites();
  }, []);
  return (
    <IonTabs className="page">
      <IonRouterOutlet>
        <Route exact path={homeLink}>
          <HomePage />
        </Route>
        <Route exact path={resumesLink}>
          <ResumesPage />
        </Route>
        <Route exact path={resumeLink}>
          <ResumePage />
        </Route>
        <Route exact path={resumeCreateLink}>
          <ResumeCreatePage />
        </Route>
        <Route exact path={applicationsLink}>
          <ApplicationsPage />
        </Route>
        <Route exact path={internshipLink}>
          <InternshipPage />
        </Route>
        <Route exact path={companyLink}>
          <CompanyPage />
        </Route>
        <Route exact path={chatLink}>
          <ChatPage />
        </Route>
        <Route exact path={favoritesLink}>
          <FavoritesPage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="">
        <IonTabButton tab="home" href={homeLink}>
          <IonIcon aria-hidden="true" icon={searchOutline} />
          <IonLabel>Поиск</IonLabel>
        </IonTabButton>
        <IonTabButton tab="offers" href={applicationsLink}>
          <IonIcon aria-hidden="true" icon={mailOpenOutline} />
          <IonLabel>Отклики</IonLabel>
        </IonTabButton>
        <IonTabButton tab="favorites" href={favoritesLink}>
          <IonIcon aria-hidden="true" icon={starOutline} />
          <IonLabel>Избранное</IonLabel>
        </IonTabButton>
        <IonTabButton tab="resume" href={resumesLink}>
          <IonIcon aria-hidden="true" icon={fileTrayFullOutline} />
          <IonLabel>Резюме</IonLabel>
        </IonTabButton>
        <IonTabButton tab="services">
          <ServiceMenuButton />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default App;
