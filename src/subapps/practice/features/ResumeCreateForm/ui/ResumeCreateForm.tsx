import React, { createContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import BaseInfoTab from "./BaseInfoTab";
import ExperienceTab from "./ExperienceTab";
import SkillsTab from "./SkillsTab";
import { ProgresBar } from "@agaspher/apply.ui-kit";
interface ResumeCreateFormProps {}

export const ResumeContext = createContext("");

const ResumeCreateForm: React.FC<ResumeCreateFormProps> = () => {
  const [tab, setTab] = useState(1);
  const [resumeId, setResumeId] = useState("");
  useEffect(() => {
    console.log('create');
    
  }, []);

  return (
    <ResumeContext.Provider value={resumeId}>
      <div className="p-4 h-full">
        <ProgresBar maxValue={3} value={tab} />
        <motion.div className="relative h-full inset-0">
          <BaseInfoTab setResumeId={setResumeId} setTab={setTab} tab={tab} />
          <ExperienceTab setTab={setTab} tab={tab} />
          <SkillsTab setResumeId={setResumeId} setTab={setTab} tab={tab} />
        </motion.div>
      </div>
    </ResumeContext.Provider>
  );
};

export default ResumeCreateForm;
