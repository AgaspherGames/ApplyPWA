import RelLink from "@/shared/components/RelLink";
import { useResumeStore } from "@/subapps/practice/entities/resume";
import NoContent from "@/subapps/practice/shared/ui/NoContent";
import ResumeCard, {
  ResumeCardSkeleton,
} from "@/subapps/practice/widgets/ResumeCard";
import { IonContent, IonIcon, IonPage, useIonRouter } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import React, { useEffect } from "react";
interface ResumesPageProps {}

const ResumesPage: React.FC<ResumesPageProps> = () => {
  const { loadUserResumes, userResumes, fetching } = useResumeStore();
  const router = useIonRouter();

  console.log(router.routeInfo);

  useEffect(() => {
    loadUserResumes();
  }, [router.routeInfo]);
  return (
    <IonPage>
      <IonContent>
        <div className="m-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Ваши резюме</h1>
            <RelLink className="h-6" to={"resume/create"}>
              <IonIcon className="h-6 w-6" icon={addOutline} />
            </RelLink>
          </div>
          <div className="grid gap-4 mt-4">
            {fetching
              ? [1, 2, 3].map((el) => <ResumeCardSkeleton key={el} />)
              : userResumes.map((resume) => (
                  <ResumeCard resume={resume} key={resume.id} />
                ))}
          </div>
          {!fetching && !userResumes.length && (
            <NoContent
              buttonText="Добавить резюме"
              link="resume/create"
              title="Вы еще не добавили ни одного резюме"
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResumesPage;
