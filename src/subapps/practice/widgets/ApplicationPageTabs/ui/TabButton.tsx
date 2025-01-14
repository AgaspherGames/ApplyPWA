import React from "react";
import { Card, Title } from "@agaspher/apply.ui-kit";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
interface TabButtonProps {
  setSelected: (tab: string) => void;
  selected: string;
  text: string;
  tab: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  setSelected,
  selected,
  text,
  tab,
}) => {
  return (
    <button
      onClick={() => {
        setSelected(tab);
      }}
      className="relative px-3 py-2"
    >
      <Title className={twMerge("z-10 relative transition-all", selected!=tab&&"text-stone-500")}>{text}</Title>
      {selected == tab && (
        <motion.div
          transition={{ type: "spring", duration: 0.5 }}
          layoutId="pill-tab"
          className="absolute inset-0 z-0"
        >
          <Card className="h-full"></Card>
        </motion.div>
      )}
    </button>
  );
};

export default TabButton;
