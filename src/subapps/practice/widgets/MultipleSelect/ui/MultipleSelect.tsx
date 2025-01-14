import React, { useState } from "react";
import MultipleSelectItem from "./MultipleSelectItem";
import { ISelectItem, ISelectItemValue } from "../model/types";

interface MultipleSelectProps {
  label: string;
  items: ISelectItem[];
  selectedItems: ISelectItemValue[];
  onSelect: (item: ISelectItem) => void;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  label,
  items,
  selectedItems,
  onSelect,
}) => {
  function isSelected(value: ISelectItemValue) {
    return selectedItems.includes(value);
  }

  return (
    <div className="mb-6 ">
      <h3 className="text-lg leading-none font-semibold">{label}</h3>

      <div className="-mx-4">
        <div className=" my-3 overflow-x-scroll w-full ">
          <div className="flex gap-2 w-max px-4">
            {items.map((el, index) => (
              <MultipleSelectItem
                key={index}
                toggle={() => {
                  onSelect(el);
                }}
                selected={isSelected(el.value)}
                text={el.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleSelect;
