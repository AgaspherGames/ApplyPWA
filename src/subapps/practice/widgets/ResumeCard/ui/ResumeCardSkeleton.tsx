import React from "react";
import { Card, Skeleton } from "@agaspher/apply.ui-kit";
interface ResumeCardSkeletonProps {}

const ResumeCardSkeleton: React.FC<ResumeCardSkeletonProps> = () => {
  return (
    <Card>
      <div className="flex z-10">
        <Skeleton className="w-20 h-20" />
        <div className="ml-4 flex flex-col">
          <h3 className=" text-xl font-semibold ">
            <Skeleton className="w-40" />
          </h3>
          <h4 className="text-stone-400">
            <Skeleton className="w-32" />
          </h4>
          <div className="flex-1 flex items-end">
            <Skeleton className="w-24" />
          </div>
        </div>
        <div className="text-green-500 text-center ml-auto flex items-center h-fit">
          <Skeleton className="w-12" />
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold">
          <Skeleton className="w-24" />
        </p>
        <div>
          <Skeleton className="w-64" />
        </div>
        <h3 className={"text-xl my-4"}>
          <Skeleton className="w-48" />
        </h3>
      </div>
    </Card>
  );
};

export default ResumeCardSkeleton;
