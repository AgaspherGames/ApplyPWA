import { create } from "zustand";
import { IFilterParams, Internship } from "./types";
import { InternshipApi } from "../api";
import { filter } from "ionicons/icons";

interface InternshipState extends IFilterParams {
  internships: Internship[];
  fetching: boolean;
  setFilter: (filters: Partial<IFilterParams>) => void;
  loadInternships: () => void;
  fetchInternships: (replace?: boolean, clearCursor?: boolean) => void;
}

export const useInternshipStore = create<InternshipState>()((set) => ({
  fetching: false,
  name: "",
  cursor: "",
  isActive: true,
  isPaid: undefined,
  maxInterns: undefined,
  companyId: "",
  internships: [],
  city: undefined,
  setFilter: async (filters) => {
    set(() => ({ ...filters, cursor: undefined }));
    const state = useInternshipStore.getState();
    await state.fetchInternships(true);
  },
  loadInternships: async () => {
    const state = useInternshipStore.getState();
    await state.fetchInternships();
  },
  fetchInternships: async (replace, clearCursor) => {
    set(() => ({ fetching: true }));
    if (clearCursor) {
      set(() => ({ cursor: "" }));
    }
    if (replace) {
      set(() => ({ internships: [] }));
    }
    const state = useInternshipStore.getState();

    const data = (
      await InternshipApi.getInternships({
        companyId: state.companyId,
        cursor: state.cursor,
        isActive: state.isActive,
        isPaid: state.isPaid,
        maxInterns: state.maxInterns,
        name: state.name,
        city: state.city,
      })
    ).data;

    set((state) => ({
      cursor: data.cursor,
      internships: [...state.internships, ...data.internships],
      fetching: false,
    }));
  },
}));
