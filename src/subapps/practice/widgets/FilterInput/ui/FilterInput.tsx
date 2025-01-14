import { useInternshipStore } from "@/subapps/practice/entities/internship/model";
import InputModal from "@/subapps/practice/features/InputModal";
import { IonInput } from "@ionic/react";
import React, { useState } from "react";
interface FilterInputProps {}

const FilterInput: React.FC<FilterInputProps> = () => {
  const { name, setFilter } = useInternshipStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="mb-6">
      <InputModal
        onSelect={(e) => setFilter({ name: e })}
        words={["Frontend", "React", "Go", "Backend", "Js", "JavaScript"]}
        isOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false);
        }}
      />
      <h3 className="text-lg leading-none font-semibold">Ключевые слова</h3>

      <IonInput
        onFocus={() => {
          setIsModalOpen(true);
        }}
        value={name}
        id="open-input-modal"
        placeholder="Frontend"
        className="border-b"
      />
    </div>
  );
};

export default FilterInput;
