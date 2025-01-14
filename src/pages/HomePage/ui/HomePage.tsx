import { IonContent, IonPage } from "@ionic/react";
import React, { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import ScrollSection from "./ScrollSection";
import InternshipsSection from "./InternshipsSection";
import "./HomePage.css";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: ref,
  });

  const [height, setHeight] = useState(900);

  return (
    <IonPage>
      <IonContent className="bg-stone-950">
        <div className="relative h-full w-full">
          <div className="absolute inset-0">
            <div
              ref={ref}
              onLoad={() => {
                setHeight(ref.current?.clientHeight || 900);
              }}
              className="h-full overflow-y-scroll max-w-[100vw] overflow-x-hidden snap-y snap-mandatory"
            >
              <ScrollSection height={height} index={0}>
                <InternshipsSection scrollY={scrollY} />
              </ScrollSection>
              <ScrollSection height={height} index={1}>
                <InternshipsSection scrollY={scrollY} />
              </ScrollSection>
              <ScrollSection height={height} index={2}>
                <InternshipsSection scrollY={scrollY} />
              </ScrollSection>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
