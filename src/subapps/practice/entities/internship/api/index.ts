import http from "@/shared/api";
import { Internship, IFilterParams } from "../model/types";

export const InternshipApi = {
  getInternships(filters?: Partial<IFilterParams>) {
    const params: any = {};
    if (filters?.cursor !== undefined) params.cursor = filters?.cursor;
    if (filters?.name !== undefined) params.name = filters?.name;
    if (filters?.isActive !== undefined) params.is_active = filters?.isActive;
    if (filters?.isPaid !== undefined) params.is_paid = filters?.isPaid;
    if (filters?.maxInterns !== undefined)
      params.max_interns = filters?.maxInterns;
    if (filters?.companyId !== undefined)
      params.company_id = filters?.companyId;
    if (filters?.city !== undefined) params.city_id = filters?.city;

    return http.get<{ cursor: string; internships: Internship[] }>(
      `/internship`,
      {
        params,
      }
    );
  },
  getInternshipById(id: string) {
    return http.get<Internship>(`/internship/${id}`);
  },
};
