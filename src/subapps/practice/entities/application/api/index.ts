import http from "@/shared/api";
import { IApplication, ICreateApplicationRequest } from "..";

export const ApplicationApi = {
  createApplication(data: ICreateApplicationRequest) {
    return http.post<{ id: number }>(`/application/user`, data);
  },
  getApplications() {
    return http.get<IApplication[]>(`/application/user`);
  },
  deleteApplications(applicationId: number) {
    return http.delete(`/application/user/${applicationId}`);
  },
};
