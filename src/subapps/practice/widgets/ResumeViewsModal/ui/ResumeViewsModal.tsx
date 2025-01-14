import { IonAvatar, IonContent, IonModal } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { BackButton, Card } from "@agaspher/apply.ui-kit";
import { Title } from "@agaspher/apply.ui-kit";
import { DateTime } from "luxon";
import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import { IResumeView } from "@/subapps/practice/entities/resume/model/types";
import { ResumeApi } from "@/subapps/practice/entities/resume";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

interface ResumeViewsModalProps {
  trigger: string;
  resumeId: string;
}

interface IReduceResult {
  [key: string]: any[];
}

const ResumeViewsModal: React.FC<ResumeViewsModalProps> = ({
  trigger,
  resumeId,
}) => {
  const [views, setViews] = useState<IResumeView[]>([]);

  async function fetchViews() {
    const respnonse = await (await ResumeApi.fetchViews(resumeId)).data;
    setViews(respnonse.views);
  }

  const ref = useRef<HTMLIonModalElement>(null);

  const viewsPerDays = views.reduce((a, c) => {
    const date = DateTime.fromISO(c.viewed_at).toFormat("dd.MM", {
      locale: "ru",
    });
    a[date] = a[date] ? [...a[date], c] : [c];
    return a;
  }, {} as IReduceResult);

  useEffect(() => {
    fetchViews();
  }, []);

  console.log(viewsPerDays);

  const ListOfViews = Object.keys(viewsPerDays).map((date) => {
    return (
      <div className="my-4">
        <Title className="text-center mb-2">{date}</Title>
        <Card>
          {viewsPerDays[date].map((view: IResumeView) => (
            <div className="flex items-center justify-between my-4">
              <div className="flex items-center gap-2">
                <IonAvatar className="w-6 h-6">
                  <img
                    className="aspect-square w-6 h-6"
                    src={getFileLink(view.company_avatar, "avatar")}
                    alt=""
                  />
                </IonAvatar>
                <Title>{view.company_name}</Title>
              </div>
              <p className="">
                {DateTime.fromISO(view.viewed_at).toFormat("HH:mm")}
              </p>
            </div>
          ))}
        </Card>
      </div>
    );
  });

  const labels = Array(7)
    .fill("")
    .map((_, ind) => {
      return DateTime.now()
        .minus({ days: 6 - ind })
        .toFormat("dd.MM");
    });
  console.log(viewsPerDays);

  return (
    <IonModal trigger={trigger} ref={ref}>
      <IonContent class="ion-padding">
        <div className="flex items-center mb-4">
          <BackButton
            back={() => {
              ref.current?.dismiss();
            }}
            className="static h-8"
          />
          <Title className=" ml-2">Просмотры резюме</Title>
        </div>
        <Card className="p-2 w-full mb-8">
          <Line
            className="w-max"
            data={{
              labels: labels,
              datasets: [
                {
                  data: labels.map((el) => viewsPerDays[el]?.length || 0),
                  label: "Просмотры",
                  borderColor: "#e7e5e4",
                  tension: 0.5,
                  cubicInterpolationMode: "monotone",
                  pointRadius: 6,
                  pointStyle: "circle",
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: false,
                },
                legend: {
                  display: false,
                },
              },

              scales: {
                x: {
                  grid: {
                    color: "transparent",
                  },
                },
                y: {
                  grid: {
                    color: "#292524",
                  },
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => {
                      return value == Math.round(+value) ? value : "";
                    },
                  },
                },
              },
            }}
          ></Line>
        </Card>
        {ListOfViews}
      </IonContent>
    </IonModal>
  );
};

export default ResumeViewsModal;
