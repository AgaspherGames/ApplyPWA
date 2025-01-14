import { useInternshipStore } from "@/subapps/practice/entities/internship/model";
import InputModal from "@/subapps/practice/features/InputModal";
import { Card } from "@agaspher/apply.ui-kit";
import { IonSearchbar } from "@ionic/react";
import React, { useState } from "react";
interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, setFilter } = useInternshipStore();
  return (
    <>
      <InputModal
        onSelect={(e) => setFilter({ name: e })}
        words={["Frontend", "React", "Go", "Backend", "Js", "JavaScript"]}
        isOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false);
        }}
      />
      <Card className="p-0 flex-1 mr-4">
        <IonSearchbar
          value={name}
          onIonClear={() => setFilter({ name: "" })}
          onFocus={() => setIsModalOpen(true)}
          placeholder="Поиск"
          className="searchBar p-0"
        />
      </Card>
    </>
  );
};

export default SearchBar;
