import { Card } from "@agaspher/apply.ui-kit";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
interface ItemsPickerProps {
  label: string;
}

const ItemsPicker: React.FC<ItemsPickerProps> = ({ label }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg leading-none font-semibold">{label}</h3>

      <div className="flex flex-wrap gap-2 my-3">
        <Card className="px-2 py-1 w-fit flex items-center gap-1">
          Астана
          <IonIcon
            className="p-0.5 bg-stone-700 rounded-full"
            icon={closeOutline}
          />
        </Card>
        <Card className="px-2 py-1 w-fit flex items-center gap-1">
          Россия
          <IonIcon
            className="p-0.5 bg-stone-700 rounded-full"
            icon={closeOutline}
          />
        </Card>
        <Card className="px-2 py-1 w-fit flex items-center gap-1">
          Новгород
          <IonIcon
            className="p-0.5 bg-stone-700 rounded-full"
            icon={closeOutline}
          />
        </Card>
        <Card className="px-2 py-1 w-fit flex items-center gap-1">
          Санкт-Петербург
          <IonIcon
            className="p-0.5 bg-stone-700 rounded-full"
            icon={closeOutline}
          />
        </Card>
      </div>
      <button className=" text-sky-500">Добавить регион</button>
    </div>
  );
};

export default ItemsPicker;
