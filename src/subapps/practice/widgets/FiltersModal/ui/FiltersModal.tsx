import { IonContent, IonIcon, IonInput, IonModal } from "@ionic/react";
import React, { useMemo } from "react";
import MultipleSelect from "../../MultipleSelect";
import FilterInput from "../../FilterInput";
import { useInternshipStore } from "@/subapps/practice/entities/internship/model";
import { Card } from "@agaspher/apply.ui-kit";
import CityInput from "@/subapps/practice/features/CityInput";
import { close } from "ionicons/icons";
interface FiltersModalProps {}

const FiltersModal: React.FC<FiltersModalProps> = () => {
  const { isPaid, maxInterns, city, setFilter } = useInternshipStore();
  const selected = useMemo(() => {
    return [isPaid];
  }, [isPaid]);
  return (
    <IonModal
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75, 1]}
      trigger="open-filters-modal"
    >
      <IonContent>
        <div className="p-4">
          <FilterInput />
          <MultipleSelect
            onSelect={(item) => {
              setFilter({ isPaid: item.value as boolean | undefined });
            }}
            selectedItems={selected}
            items={[
              { name: "Все", value: undefined },
              { name: "Оплачиваемая", value: true },
              { name: "Неоплачиваемая", value: false },
            ]}
            label="Тип стажировки"
          />

          <h3 className="text-lg leading-none font-semibold">
            Максимум стажеров
          </h3>
          <IonInput
            onIonChange={(e) =>
              setFilter({
                maxInterns: +(e.target.value as string) || undefined,
              })
            }
            value={maxInterns}
            id="open-input-modal"
            placeholder="Без ограничения"
            min={0}
            type="number"
            className="border-b mb-4"
          />
          <div className="flex gap-2 items-center">
            <CityInput
              className="w-full"
              value={city}
              onSelect={(item) => {
                setFilter({
                  city: +item.value,
                });
              }}
            />
            {city && (
              <Card
                onClick={() => {
                  setFilter({
                    city: undefined,
                  });
                }}
                role="button"
                className="p-1 rounded-lg w-min h-min flex justify-center items-center"
              >
                <IonIcon className="w-8 h-8" icon={close} />
              </Card>
            )}
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default FiltersModal;
