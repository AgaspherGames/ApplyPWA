import http from "@/shared/api";
import { ICompany } from "../model/types";

export const CompanyApi = {
  getById(id: string) {
    return http.get<ICompany>(`/company/${id}`);
  },
};
