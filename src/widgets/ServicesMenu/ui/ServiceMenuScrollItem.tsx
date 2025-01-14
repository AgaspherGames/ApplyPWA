import React, { ReactNode, createContext } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

interface ServiceMenuScrollItemProps {
  width: number;
  index: number;
  scrollX: MotionValue<number>;
  children: ReactNode;
}

export const ServiceMenuScrollContext = createContext([-200, 0, 200]);

const ServiceMenuScrollItem: React.FC<ServiceMenuScrollItemProps> = ({
  width,
  index,
  scrollX,
  children,
}) => {
  const range = [width * (index - 1), width * index, width * (index + 1)];
  const opacity = useTransform(scrollX, range, [0, 1, 0]);
  return (
    <ServiceMenuScrollContext.Provider value={range}>
      <motion.div
        style={{ opacity }}
        className="min-w-full h-full snap-start"
      >
        {children}
      </motion.div>
    </ServiceMenuScrollContext.Provider>
  );
};

export default ServiceMenuScrollItem;
