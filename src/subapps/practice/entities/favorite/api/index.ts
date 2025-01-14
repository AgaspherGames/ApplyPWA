import http from "@/shared/api";
import { Internship } from "../../internship";

export const FavoriteApi = {
  getFavoriteInternships() {
    return http.get<{ internships: Internship[] }>("/internship/favorite");
  },
  addFavoriteInternship(id: string) {
    return http.post(`/internship/favorite/${id}`);
  },
  removeFavoriteInternship(id: string) {
    return http.delete(`/internship/favorite/${id}`);
  },
};
