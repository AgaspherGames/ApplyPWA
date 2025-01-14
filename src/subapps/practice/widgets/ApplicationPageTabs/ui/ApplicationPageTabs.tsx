import React, { ReactNode, useEffect, useState } from "react";
import ApplicationTab from "../../ApplicationTab";
import { AnimatePresence, motion } from "framer-motion";
import TabButton from "./TabButton";
import ChatsTab from "../../ChatsTab";
import { useApplicationStore } from "@/subapps/practice/entities/application/model/model";
import { useChatStore } from "@/subapps/practice/entities/chat";
import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
interface ApplicationPageTabsProps {}

const tabs = ["applications", "chats"];

const ApplicationPageTabs: React.FC<ApplicationPageTabsProps> = () => {
  const [selected, setSelected] = useState(tabs[0]);

  const { loadApplications } = useApplicationStore();
  const { loadChats } = useChatStore();

  async function loadData() {
    return Promise.all([loadApplications(), loadChats()]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <IonRefresher
        onIonRefresh={async (event: CustomEvent<RefresherEventDetail>) => {
          await loadData();
          event.detail.complete();
        }}
        slot="fixed"
      >
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <div className="flex gap-4 mb-4">
        <TabButton
          selected={selected}
          setSelected={setSelected}
          tab="applications"
          text="Отклики"
        />
        <TabButton
          selected={selected}
          setSelected={setSelected}
          tab="chats"
          text="Чаты"
        />
      </div>
      <AnimatePresence mode="wait">
        {selected == "applications" && (
          <TabContainer key="applications">
            <ApplicationTab />
          </TabContainer>
        )}
        {selected == "chats" && (
          <TabContainer key="chats">
            <ChatsTab />
          </TabContainer>
        )}
      </AnimatePresence>
    </div>
  );
};

function TabContainer({ children, key }: { children: ReactNode; key: string }) {
  return (
    <motion.div
      key={key}
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
    >
      {children}
    </motion.div>
  );
}

export default ApplicationPageTabs;
