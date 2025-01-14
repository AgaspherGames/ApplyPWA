import { IonIcon, IonLabel } from "@ionic/react";
import React from "react";
import { twMerge } from "tailwind-merge";
interface LanidngSectionItemProps {
  double?: boolean;
  label: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
}

const LanidngSectionItem: React.FC<LanidngSectionItemProps> = ({
  double,
  label,
  gradientFrom,
  gradientTo,
  icon,
}) => {
  return (
    <div
      style={{
        background: `linear-gradient(to top left, ${gradientFrom}, ${gradientTo})`,
      }}
      className={twMerge(
        "w-full aspect-square  rounded-xl relative linear bg-gradient-to-tl overflow-hidden group",
        double && "col-span-2 aspect-auto"
      )}
    >
      <div className="absolute top-2 left-2">
        <IonLabel className="sm:text-lg font-medium">{label}</IonLabel>
      </div>
      <div className=" transition-all duration-500 opacity-20 group-hover:opacity-55">
        <IonIcon
          className="h-4/5 w-4/5 absolute -bottom-1/4 translate-x-full right-1/2  transition-all duration-500 group-hover:rotate-12"
          icon={icon}
        />
        {double && (
          <>
            <IonIcon
              className="h-4/5 w-4/5 absolute -top-1/4 left-3.5 transition-all duration-500 group-hover:rotate-12"
              icon={icon}
            />
            <IonIcon
              className="h-4/5 w-4/5 absolute -bottom-1/4 -left-1/3 transition-all duration-500 group-hover:rotate-12"
              icon={icon}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LanidngSectionItem;
