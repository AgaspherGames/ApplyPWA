import { ICreateResumeRequest } from "@/subapps/practice/entities/resume";
import React from "react";
import CityInput from "../../../CityInput";
interface ResumeCityInputProps {
  value: string;
  updateData: (data: Partial<ICreateResumeRequest>) => void;
}

const ResumeCityInput: React.FC<ResumeCityInputProps> = ({
  value,
  updateData,
}) => {
  async function update(value: number) {
    await updateData( { city_id: value });
  }
  return <CityInput value={+value} onSelect={(e) => update(+e.value)} />;
};

export default ResumeCityInput;
