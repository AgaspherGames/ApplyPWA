import { Card, Skeleton } from "@agaspher/apply.ui-kit";
import { IonAvatar, IonCardTitle, IonLabel } from "@ionic/react";
import React from "react";

interface InternshipCardSkeletonProps {}

const InternshipCardSkeleton: React.FC<InternshipCardSkeletonProps> = ({}) => {
  return (
    <Card>
      <div className=" flex justify-between">
        <div className="flex items-center gap-2">
          <IonCardTitle class="text-2xl">
            <Skeleton className="h-[2ch] w-52" />
          </IonCardTitle>
          <div className="w-fit flex items-center text-zinc-500">
            <Skeleton className="h-[2ch] w-16" />
          </div>
        </div>
      </div>
      <div className="flex items-center my-1 gap-1 ">
        <IonAvatar class="w-6 h-6">
          <Skeleton className="h-6 w-6 rounded-full" />
        </IonAvatar>
        <IonLabel className="">
          <Skeleton className="h-[2ch] w-24" />
        </IonLabel>
      </div>
      <div className="flex flex-col gap-2 my-2 md:flex-row">
        <Card className="text-zinc-500 flex gap-2 items-center py-2 w-min">
          <Skeleton className="w-4 h-4 rounded-md" />
          <p>
            <Skeleton className="h-[2ch] w-24" />
          </p>
        </Card>
        <Card className="flex-col gap-2  flex flex-1 py-2 pb-4">
          <Skeleton className="w-48" />
          <div className="w-full">
            <Skeleton className="w-full h-2" />
          </div>
        </Card>
      </div>

      <p className="mt-3 line-clamp-3">
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
      </p>
      <div className="w-full overflow-scroll">
        <div className="flex gap-2 mt-2 w-max ">
          <Card className="w-fit py-1.5 px-3">
            <Skeleton className="w-20" />
          </Card>
          <Card className="w-fit py-1.5 px-3">
            <Skeleton className="w-32" />
          </Card>
          <Card className="w-fit py-1.5 px-3">
            <Skeleton className="w-12" />
          </Card>
        </div>
      </div>
      <Skeleton className="w-full h-10 mt-4" />
    </Card>
  );
};

export default InternshipCardSkeleton;
