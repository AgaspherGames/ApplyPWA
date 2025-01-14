import { IonIcon } from "@ionic/react";
import { optionsOutline } from "ionicons/icons";
import React from "react";
import FiltersModal from "../../FiltersModal";
import SearchBar from "../../SearchBar";
import { Card } from "@agaspher/apply.ui-kit";
interface FiltersBarProps {}

const FiltersBar: React.FC<FiltersBarProps> = () => {
  return (
    <>
      <div className="m-4 flex">
        <SearchBar />
        <Card className="p-0 aspect-square h-full flex items-center justify-center">
          <button id="open-filters-modal" className="h-6">
            <IonIcon className="w-6 h-6" icon={optionsOutline} />
          </button>
        </Card>
      </div>
      <FiltersModal />
    </>
  );
};

export default FiltersBar;
