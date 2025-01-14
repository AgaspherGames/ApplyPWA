import { IMessage, MessageApi } from "@/subapps/practice/entities/message";
import { Card, Skeleton } from "@agaspher/apply.ui-kit";
import { IonIcon } from "@ionic/react";
import {
  checkmarkDoneOutline,
  checkmarkOutline,
  timeOutline,
} from "ionicons/icons";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
interface MessageCardSkeletonProps {}

const MessageCardSkeleton: React.FC<MessageCardSkeletonProps> = ({}) => {
  const [direction, setDirection] = useState(Math.random() * 2);
  console.log(direction);

  return (
    <Card className={twMerge("w-[80%]", direction > 1 && "ml-auto")}>
      <div className="w-full">
        <p className="w-full">
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
          <Skeleton className="w-32" />
        </p>
      </div>
      <div className="flex justify-end items-center gap-1">
        <p className="text-sm text-stone-500 text-end">
          <Skeleton className="w-16" />
        </p>
      </div>
    </Card>
  );
};

export default MessageCardSkeleton;
