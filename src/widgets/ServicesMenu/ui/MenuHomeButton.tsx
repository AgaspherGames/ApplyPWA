import React, { useContext } from "react";
import { ServiceMenuScrollContext } from "./ServiceMenuScrollItem";
import { Card, Title } from "@agaspher/apply.ui-kit";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

interface MenuHomeButtonProps {
  scrollX: MotionValue<number>;
}

const MenuHomeButton: React.FC<MenuHomeButtonProps> = ({ scrollX }) => {
  const range = useContext(ServiceMenuScrollContext);

  const applyMove1 = useTransform(scrollX, range, ["-100%", "0%", "-100%"]);
  const applyMove2 = useTransform(scrollX, range, ["100%", "0%", "100%"]);
  const applyMove3 = useTransform(scrollX, range, ["-100%", "0%", "-100%"]);

  return (
    <Card className="h-full w-full flex items-center justify-center relative z-0 overflow-visible p-0">
      <Title className="text-4xl">Apply</Title>
      <div className="absolute h-3/4 w-3/4 left-1/2 top-1/2 -z-10 -translate-y-1/2 -translate-x-1/2 overflow-visible p-3">
        <svg
          className="h-full w-full opacity-90 overflow-visible"
          width="672"
          height="604"
          viewBox="0 0 672 604"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            style={{ translateX: applyMove1 }}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M215.385 215.385C96.431 215.385 0 311.815 0 430.769V560C0 583.791 19.2862 603.077 43.0769 603.077V603.077C66.8677 603.077 86.1539 583.791 86.1539 560V430.769C86.1539 359.397 144.012 301.538 215.385 301.538H344.615C368.406 301.538 387.692 282.252 387.692 258.461V258.461C387.692 234.671 368.406 215.385 344.615 215.385H215.385Z"
            fill="#22C55E"
          />
          <motion.path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M495.385 146.461C471.594 146.461 452.308 165.748 452.308 189.538V249.846C452.308 321.218 394.449 379.077 323.077 379.077H198.154C174.363 379.077 155.077 398.363 155.077 422.154V422.154C155.077 445.944 174.363 465.231 198.154 465.231H323.077C442.031 465.231 538.461 368.8 538.461 249.846V189.538C538.461 165.748 519.175 146.461 495.385 146.461V146.461Z"
            fill="#22C55E"
            style={{ translateY: applyMove2 }}
          />
          <motion.path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M327.385 0C303.594 0 284.308 19.2862 284.308 43.0769C284.308 66.8676 303.594 86.1538 327.385 86.1538H585.846V353.231C585.846 377.021 605.132 396.308 628.923 396.308C652.714 396.308 672 377.021 672 353.231V43.0769C672 19.2862 652.714 0 628.923 0H327.385Z"
            fill="#22C55E"
            style={{ translateY: applyMove3 }}
          />
        </svg>
      </div>
    </Card>
  );
};

export default MenuHomeButton;
