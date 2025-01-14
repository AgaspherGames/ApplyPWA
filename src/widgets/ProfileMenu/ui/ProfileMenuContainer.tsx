import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ProfileMenuContainerProps {
  tab: string;
  currentTab: string;
  children: React.ReactNode;
  closedPos: {
    translateX: string;
    translateY: string;
  };
  initialOpen?: boolean;
  className?: string;
}

const ProfileMenuContainer: React.FC<ProfileMenuContainerProps> = ({
  tab,
  currentTab,
  children,
  initialOpen,
  className,
}) => {
  if (tab !== currentTab) {
    return ""
  }
  return (
    <motion.div
      id={`tab_${tab}`}
      initial={initialOpen ? "open" : "closed"}
      animate={currentTab == tab ? "open" : "closed"}
    >
      <motion.div
        variants={{
          closed: {
            opacity: 0,
            translateX: initialOpen ? "-100%" : "100%",
            zIndex: 0,
            overflow: "hidden",
          },
          open: {
            zIndex: 10,
            opacity: 1,
            translateX: "0%",
            maxHeight: "fit-content",
            overflow: "visible",
          },
        }}
        animate={{
          zIndex: 10,
          opacity: 1,
          translateX: "0%",
          maxHeight: "fit-content",
          overflow: "visible",
        }}
        exit={{
          opacity: 0,
          translateX: initialOpen ? "-100%" : "100%",
          zIndex: 0,
          overflow: "hidden",
        }}
        initial={{
          opacity: 0,
          translateX: initialOpen ? "-100%" : "100%",
          zIndex: 0,
          overflow: "hidden",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className={twMerge("absolute pb-4", className)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ProfileMenuContainer;
