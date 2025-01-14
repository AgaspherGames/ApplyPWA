import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import PracticeApp from "@/subapps/practice";
import MainNavigation from "./MainNavigation";
import LoginPage from "@/pages/auth/LoginPage";
import AuthProvider from "../AuthProvider";
import RegisterPage from "@/pages/auth/RegisterPage";
import { RouteContext } from "../RouteContext";
import { useAppStore } from "@/app/model";
import { AuthApi } from "@/entities/auth";
import { LoadingScreen } from "@agaspher/apply.ui-kit";
interface MainRouterProps {}

const MainRouter: React.FC<MainRouterProps> = () => {
  const { isAuthLoaded, setIsAuthLoaded } = useAppStore();

  useEffect(() => {
    async function loadData() {
      try {
        await AuthApi.refresh();
      } catch (error) {
      } finally {
        setIsAuthLoaded(true);
      }
    }

    loadData();
  }, []);

  if (!isAuthLoaded) {
    return <LoadingScreen />;
  }
  return (
    <IonReactRouter>
      <IonRouterOutlet animated={false}>
        <AuthProvider>
          <Route
            exact
            path={"/"}
            render={() => {
              return <Redirect push={false} exact from="/" to={"/main/home"} />;
            }}
          />
          <Route path="/main">
            <RouteContext.Provider value="main">
              <MainNavigation />
            </RouteContext.Provider>
          </Route>
          <Route path="/practice">
            <RouteContext.Provider value="practice">
              <PracticeApp />
            </RouteContext.Provider>
          </Route>
        </AuthProvider>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default MainRouter;
