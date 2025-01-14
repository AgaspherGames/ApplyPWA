import React from "react";
import ApplicationCard, {
  ApplicationCardSkeleton,
} from "../../ApplicationCard";
import { useApplicationStore } from "@/subapps/practice/entities/application/model/model";
interface ApplicationTabProps {}

const ApplicationTab: React.FC<ApplicationTabProps> = () => {
  const { applications, isFetching, isLoaded, loadApplications } =
    useApplicationStore();

  return (
    <div className="grid gap-4 pb-4">
      {isFetching
        ? [1, 2, 3, 4, 5].map((i) => <ApplicationCardSkeleton key={i} />)
        : applications.map((application) => (
            <ApplicationCard
              update={loadApplications}
              key={application.id}
              application={application}
            />
          ))}
    </div>
  );
};

export default ApplicationTab;
