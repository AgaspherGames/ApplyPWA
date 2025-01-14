import { IonContent, IonModal, IonPage } from "@ionic/react";
import React, { useRef, useState } from "react";
import "./style.css";
import { useScroll } from "framer-motion";
import ServiceMenuScrollItem from "./ServiceMenuScrollItem";
import MenuHomeButton from "./MenuHomeButton";

interface ServicesMenuProps {}

const ServicesMenu: React.FC<ServicesMenuProps> = () => {
  const [width, setWidth] = useState(383);

  const ref = useRef<HTMLDivElement>(null);

  const { scrollXProgress, scrollX } = useScroll({
    container: ref,
  });

  console.log(scrollX.get(), scrollXProgress.get());

  return (
    <>
      <IonModal
        id="services-menu"
        className="flex flex-1 bg-transparent ion-transparent-bg backdrop-blur-sm"
        initialBreakpoint={0.4}
        trigger="open-services-menu"
        showBackdrop
        breakpoints={[0, 0.4]}
        handleBehavior="cycle"
      >
        <IonPage className="ion-transparent-bg">
          <IonContent className="ion-transparent-bg">
            <div className="flex gap-4 flex-col h-[40%] w-full p-4">
              <div
                onLoad={() => {
                  setWidth(ref.current?.clientWidth || 383);
                }}
                ref={ref}
                className="flex-1 flex overflow-x-scroll bg-transparent p-0 snap-x snap-mandatory rounded-lg"
              >
                <ServiceMenuScrollItem
                  index={0}
                  scrollX={scrollX}
                  width={width}
                >
                  <MenuHomeButton scrollX={scrollX} />
                </ServiceMenuScrollItem>
                <ServiceMenuScrollItem
                  index={1}
                  scrollX={scrollX}
                  width={width}
                >
                  <MenuHomeButton scrollX={scrollX} />
                </ServiceMenuScrollItem>
              </div>
            </div>
          </IonContent>
        </IonPage>
      </IonModal>
    </>
  );
};

export default ServicesMenu;
