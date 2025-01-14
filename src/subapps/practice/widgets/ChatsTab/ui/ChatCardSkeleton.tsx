import { Card, Skeleton, Title } from "@agaspher/apply.ui-kit";
import { IonAvatar } from "@ionic/react";
import React from "react";
interface ChatCardSkeletonProps {}

const ChatCardSkeleton: React.FC<ChatCardSkeletonProps> = ({}) => {
  return (
    <Card className="flex gap-4 items-center">
      <div className="">
        <IonAvatar className="w-12 h-12">
          <Skeleton className="rounded-full w-12 h-12" />
        </IonAvatar>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-sm text-stone-500 leading-[1.2]">
            <Skeleton className="w-12" />
          </p>
          <p className="text-sm text-stone-500 leading-[1.2]">
            <Skeleton className="w-12" />
          </p>
        </div>
        <Title className="">
          <Skeleton className="w-32" />
        </Title>
        <p className="text-stone-500 line-clamp-1">
          <Skeleton className="w-64" />
        </p>
      </div>
    </Card>
  );
};

export default ChatCardSkeleton;
