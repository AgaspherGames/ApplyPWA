import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import React, { useEffect } from "react";
import "./HomePage.css";
import FiltersBar from "@/subapps/practice/widgets/FiltersBar";
import InternshipCard, {
  InternshipCardSkeleton,
} from "@/subapps/practice/widgets/InternshipCard";
import { useInternshipStore } from "@/subapps/practice/entities/internship/model";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { internships, loadInternships, fetchInternships, cursor, fetching } =
    useInternshipStore();

  useEffect(() => {
    loadInternships();
  }, []);
  return (
    <IonPage>
      <FiltersBar />
      <IonContent>
        <IonRefresher
          onIonRefresh={async (event: CustomEvent<RefresherEventDetail>) => {
            await fetchInternships(true, true);
            event.detail.complete();
          }}
          slot="fixed"
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="mx-4 grid gap-4">
          {!internships.length &&
            fetching &&
            [1, 2, 3].map((el) => <InternshipCardSkeleton key={el} />)}
          {internships.map((internship) => (
            <InternshipCard internship={internship} key={internship.id} />
          ))}
        </div>
        <IonInfiniteScroll
          onIonInfinite={async (ev) => {
            if (cursor) {
              await loadInternships();
            }
            ev.target.complete();
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
