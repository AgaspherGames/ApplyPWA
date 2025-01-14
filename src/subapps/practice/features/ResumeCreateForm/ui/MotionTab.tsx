import React from "react";
import { motion } from "framer-motion";
interface MotionTabProps extends React.HTMLAttributes<HTMLDivElement> {
  tab: number;
  activeTab: number;
}

const MotionTab: React.FC<MotionTabProps> = ({ tab, activeTab, children }) => {


  if (tab !== activeTab) return ""

  return (
    <motion.div
      exit={{
        left: "-100vw"
      }}
      initial={{
        left: "100vw"
      }}
      animate={{
        left: "0vw"
      }}
      transition={{
        type: "spring",
        stiffness: 85,
        damping: 9,
        mass: 0.5,
      }}
      className="absolute w-full inset-0"
    >
      {children}
    </motion.div>
  );
};

export default MotionTab;
