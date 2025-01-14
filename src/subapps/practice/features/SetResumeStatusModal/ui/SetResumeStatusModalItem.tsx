import { ResumeStatuses } from "@/subapps/practice/entities/resume/model/types";
import { RESUME_STATUS } from "@/subapps/practice/shared/utils/StatusUtils";
import { CustomButton } from "@agaspher/apply.ui-kit";
import React from "react";
import { twMerge } from "tailwind-merge";
interface SetResumeStatusModalItemProps {
  currentStatus: ResumeStatuses;
  buttonStatus: ResumeStatuses;
  selectStatus: (status: ResumeStatuses) => void;
}

const SetResumeStatusModalItem: React.FC<SetResumeStatusModalItemProps> = ({
  buttonStatus,
  currentStatus,
  selectStatus,
}) => {
  return (
    <CustomButton
      onClick={() => selectStatus(buttonStatus)}
      className={twMerge(
        currentStatus == buttonStatus && "bg-green-600 text-white"
      )}
    >
      {RESUME_STATUS[buttonStatus].text}
    </CustomButton>
  );
};

export default SetResumeStatusModalItem;
