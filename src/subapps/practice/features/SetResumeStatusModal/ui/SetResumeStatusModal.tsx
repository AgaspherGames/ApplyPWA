import {
  ICreateResumeRequest,
  ResumeStatuses,
} from "@/subapps/practice/entities/resume/model/types";
import { Card } from "@agaspher/apply.ui-kit";
import { IonModal } from "@ionic/react";
import React, { useRef } from "react";
import SetResumeStatusModalItem from "./SetResumeStatusModalItem";
interface SetResumeStatusModalProps {
  trigger?: string;
  resumeId: string;
  status: ResumeStatuses;
  updateData: (data: Partial<ICreateResumeRequest>) => void;
}

const SetResumeStatusModal: React.FC<SetResumeStatusModalProps> = ({
  trigger = "open-status-modal",
  status,
  updateData,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  async function selectStatus(status: ResumeStatuses) {
    await updateData({ status });
    modal.current?.dismiss();
  }

  return (
    <IonModal
      onWillDismiss={() => modal.current?.dismiss()}
      ref={modal}
      className="ion-transparent-bg bg-black bg-opacity-20 "
      trigger={trigger}
    >
      <div
        className="h-full flex items-center justify-center"
        onClick={(e) => modal.current?.dismiss()}
      >
        <Card
          onClick={(e) => e.stopPropagation()}
          className="mx-4 bg-opacity-100 w-full"
        >
          <h2 className="text-xl font-medium">Статус резюме</h2>
          <div className="grid gap-2 mt-4">
            <SetResumeStatusModalItem
              buttonStatus="active_search"
              currentStatus={status}
              selectStatus={selectStatus}
            />
            <SetResumeStatusModalItem
              buttonStatus="has_internship_offer"
              currentStatus={status}
              selectStatus={selectStatus}
            />
            <SetResumeStatusModalItem
              buttonStatus="looking_for_offers"
              currentStatus={status}
              selectStatus={selectStatus}
            />
            <SetResumeStatusModalItem
              buttonStatus="inactive"
              currentStatus={status}
              selectStatus={selectStatus}
            />
          </div>
        </Card>
      </div>
    </IonModal>
  );
};

export default SetResumeStatusModal;
