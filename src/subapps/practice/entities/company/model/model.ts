import { create } from "zustand";
import { ICompany } from "./types";
import { CompanyApi } from "../api/CompanyApi";

interface CompanyState {
  company?: ICompany;
}

export const useCompanyStore = create<CompanyState>()((set) => ({
  company: undefined,
}));
