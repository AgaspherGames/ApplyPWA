import { Card } from "@agaspher/apply.ui-kit";
import React from "react";
import { twMerge } from "tailwind-merge";
interface MultipleSelectItemProps {
  selected?: boolean;
  text: string;
  toggle: () => void;
}

const MultipleSelectItem: React.FC<MultipleSelectItemProps> = ({
  selected,
  text,
  toggle,
}) => {
  return (
    <Card
      onClick={toggle}
      className={twMerge(
        "px-2.5 py-0.5 w-fit flex items-center rounded-full transition-all box-border m-1",
        selected &&
          "bg-stone-500 text-white outline-1 outline outline-stone-400"
      )}
    >
      {text}
    </Card>
  );
};

export default MultipleSelectItem;
