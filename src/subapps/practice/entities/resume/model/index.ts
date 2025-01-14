import { create } from "zustand";
import { IResume } from "./types";
import { ResumeApi } from "../api";

interface ResumeState {
  fetching: boolean;
  userResumes: IResume[];
  loadUserResumes: () => void;
}

export const useResumeStore = create<ResumeState>()((set) => ({
  fetching: true,
  userResumes: [],
  loadUserResumes: async () => {
    set(() => ({
      fetching: true,
    }));
    const resumes = (await ResumeApi.fetchResumes()).data;
    set(() => ({ userResumes: resumes, fetching: false }));
  },
}));
