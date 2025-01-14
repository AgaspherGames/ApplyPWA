import { useScrollProgress } from "@/shared/utils/hooks";
import React, { useEffect, useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";
interface ScrollShadowProps extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollShadow: React.FC<ScrollShadowProps> = ({
  children,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const verticalShadow = [
    "[mask-image:linear-gradient(0deg,#000_calc(100%_-_20px),transparent)]",
    "[mask-image:linear-gradient(180deg,#000_calc(100%_-_20px),transparent)]",
    "[mask-image:linear-gradient(#000,#000,transparent_0,#000_20px,#000_calc(100%_-_20px),transparent)]",
  ];

  const [scrollValue, scrollContainerToBottom] = useScrollProgress(ref);

  const shadowClass = useMemo(() => {
    if (!scrollValue.totalHeight) return "";
    if (!scrollValue.scrollProgress) return verticalShadow[1];
    if (scrollValue.scrollProgress == 100) return verticalShadow[0];
    else return verticalShadow[2];
  }, [scrollValue]);

  useEffect(() => {
    scrollContainerToBottom();
  }, [scrollValue.totalHeight]);

  return (
    <div
      className={twMerge("overflow-y-scroll", shadowClass, className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollShadow;
