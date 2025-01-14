import { create } from "zustand";
import { IApplication } from "./types";
import { ApplicationApi } from "../api";

interface ApplicationState {
  applications: IApplication[];
  isFetching: boolean;
  isLoaded: boolean;
  loadApplications: () => Promise<void>;
}

export const useApplicationStore = create<ApplicationState>()((set) => ({
  applications: [],
  isFetching: false,
  isLoaded: false,
  async loadApplications() {
    set({
      isFetching: true,
    });
    const resp = await ApplicationApi.getApplications();
    set({
      applications: resp.data,
      isFetching: false,
      isLoaded: true,
    });
  },
}));
