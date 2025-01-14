import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import { CompanyApi, ICompany } from "@/subapps/practice/entities/company";
import {
  Internship,
  InternshipApi,
} from "@/subapps/practice/entities/internship";
import InternshipCard from "@/subapps/practice/widgets/InternshipCard";
import { BackButton, Card, LoadingScreen, Title } from "@agaspher/apply.ui-kit";
import {
  IonContent,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import {
  callOutline,
  globeOutline,
  mailOutline,
  pencilOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
interface CompanyPageProps {}

const CompanyPage: React.FC<CompanyPageProps> = () => {
  const [company, setCompany] = useState<ICompany>();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [cursor, setCursor] = useState("");

  const router = useIonRouter();

  const { id } = useParams<{ id: string }>();

  async function loadCompany() {
    const company = (await CompanyApi.getById(id)).data;
    setCompany(company);
  }
  async function loadInternships() {
    const { internships, cursor: respCursor } = (
      await InternshipApi.getInternships({ companyId: id, cursor })
    ).data;
    setInternships((p) => [...p, ...internships]);
    setCursor(respCursor);
  }

  useEffect(() => {
    loadCompany();
    loadInternships();
  }, []);

  if (!company) return <LoadingScreen />;

  return (
    <IonPage>
      <IonContent>
        <div className="relative z-10">
          <BackButton
            back={() => {
              router.goBack();
            }}
          />
        </div>
        <div className="relative w-full  bg-stone-950">
          <section className="relative block h-[320px] md:h-[500px]">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundColor: "transparent",
                backgroundImage: `url("${getFileLink(company?.banner)}")`,
              }}
            >
              {company?.banner && (
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-50 bg-black"
                ></span>
              )}
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative pt-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <Card blur className="relative flex flex-col min-w-0 break-words overflow-visible w-full mb-6 shadow-xl rounded-lg -mt-64 bg-stone-900 bg-opacity-60 ">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <div className="relative group">
                          <img
                            alt="..."
                            src={getFileLink(company?.avatar, "avatar")}
                            className="shadow-xl rounded-full h-auto align-middle border-none aspect-square object-cover -my-16 max-w-[150px] "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-16">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                      {company?.name}
                    </h3>
                    <div className="mb-2 text-blueGray-600 flex items-center justify-center">
                      <IonIcon className="mr-2 text-lg" icon={mailOutline} />
                      {company?.email}
                    </div>
                    {company?.number && (
                      <div className="mb-2 text-blueGray-600  flex items-center justify-center">
                        <IonIcon className="mr-2 text-lg" icon={callOutline} />
                        {company?.number}
                      </div>
                    )}
                    {company?.website && (
                      <div className="mb-2 text-blueGray-600  flex items-center justify-center">
                        <IonIcon className="mr-2 text-lg" icon={globeOutline} />
                        <a
                          className="text-blue-300"
                          target="_blank"
                          href={
                            company.website.startsWith("http")
                              ? company.website
                              : "https://" + company.website
                          }
                        >
                          {company?.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          {company?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
          <div>
            <Title className="mx-4 mb-4 text-2xl">Стажировки компании</Title>
            <div className="mx-4 grid gap-4">
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
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CompanyPage;
