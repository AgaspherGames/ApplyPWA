import {
  SelectModalItem,
  CustomInput,
  SelectModal,
} from "@agaspher/apply.ui-kit";
import React, { useEffect, useId, useMemo, useState } from "react";
import { useCityStore } from "../model/model";
import { ICity } from "../model/types";
interface CityInputProps {
  onSelect: (item: SelectModalItem) => void;
  defaultValue?: SelectModalItem;
  value?: number;
  className?: string;
}

const CityInput: React.FC<CityInputProps> = ({
  onSelect,
  defaultValue,
  value,
  className,
}) => {
  const { loadCities, cities } = useCityStore();
  const [selected, setSelected] = useState(value);
  const selectedCity = useMemo(() => {
    return cities.reduce<undefined | ICity>((acc, curr) => {
      const city = curr.cities.find((city) => city.id == (value || selected));
      if (city) acc = city;
      console.log(acc);

      return acc;
    }, undefined);
  }, [cities, value, selected]);

  function selectCity(item: SelectModalItem) {
    setSelected(+item.value);
    onSelect(item);
  }

  useEffect(() => {
    setSelected(value);
  }, [value]);
  useEffect(() => {
    loadCities();
  }, []);

  const items = useMemo(
    () =>
      cities.map((el) => ({
        name: el.name,
        value: el.id + "",
        items: el.cities.map((city) => ({
          name: city.name,
          value: city.id + "",
        })),
      })),
    [cities]
  );

  const id = useId();

  return (
    <>
      <div className={className} id={id}>
        <CustomInput
          onIonFocus={(e) => e.target.blur()}
          value={selectedCity?.name}
          label="Город"
          placeholder="Не выбрано"
        />
      </div>
      <SelectModal trigger={id} onSelect={selectCity} items={items} />
    </>
  );
};

export default CityInput;
