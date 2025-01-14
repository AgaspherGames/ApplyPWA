import { Card, ProgresBar } from "@agaspher/apply.ui-kit";
import React from "react";
interface InternshipProgressBarProps {
  maxInterns: number;
  interns: number;
}

const InternshipProgressBar: React.FC<InternshipProgressBarProps> = ({
  interns,
  maxInterns,
}) => {
  const multiplyer = maxInterns > 10 ? 10 / maxInterns : 1;
  const maxValue = Math.floor(maxInterns * multiplyer);
  const value = Math.floor(interns * multiplyer);
  return (
    <Card className="flex-col gap-2  flex flex-1 py-2 pb-4">
      <p>
        Нанято {interns} из {maxInterns} стажеров
      </p>
      <div className="w-full">
        <ProgresBar maxValue={maxValue} value={value} />
      </div>
    </Card>
  );
};

export default InternshipProgressBar;
