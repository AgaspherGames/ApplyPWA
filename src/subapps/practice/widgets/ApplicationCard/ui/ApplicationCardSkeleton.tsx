import { Card, Skeleton, Title } from "@agaspher/apply.ui-kit";
import { IonAvatar, IonLabel } from "@ionic/react";
import React from "react";
interface ApplicationCardSkeletonProps {}

const ApplicationCardSkeleton: React.FC<
  ApplicationCardSkeletonProps
> = ({}) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <Skeleton className="w-32" />
      </div>
      <div className="my-4">
        <Title>
          <Skeleton className="w-48" />
        </Title>
        <div className="flex items-center my-1 gap-1 ">
          <IonAvatar class="w-6 h-6">
            <Skeleton className="rounded-full w-6 h-6" />
          </IonAvatar>
          <IonLabel className="">
            <Skeleton className="w-24" />
          </IonLabel>
        </div>
      </div>
      <div>
        <p>
          <Skeleton className="w-32" />
        </p>
      </div>
      <Skeleton className="w-full h-10 mt-4" />
    </Card>
  );
};

export default ApplicationCardSkeleton;
