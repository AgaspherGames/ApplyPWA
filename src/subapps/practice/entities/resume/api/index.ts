import http from "@/shared/api";
import {
  ICreateResumeRequest,
  ICreateResponse,
  ICreateExperience,
  ICreateSkill,
} from "..";
import { IResume, IResumeViewResponse } from "../model/types";

export const ResumeApi = {
  async createResume(resume: ICreateResumeRequest) {
    return http.post<ICreateResponse>("/resume", resume);
  },
  async createExperience(resumeId: string, experience: ICreateExperience) {
    if (!experience.end_date) {
      delete experience.end_date;
    }
    return http.post<ICreateResponse>(
      `/resume/${resumeId}/experience`,
      experience
    );
  },
  async createSkill(resumeId: string, skill: ICreateSkill) {
    return http.post<ICreateResponse>(`/resume/${resumeId}/skill`, skill);
  },
  async uploadImage(resumeId: string, image: Blob) {
    const formData = new FormData();
    formData.append("file", image);
    return http.post(`/resume/${resumeId}/image`, formData);
  },

  async fetchResumes() {
    return http.get<IResume[]>("/resume");
  },
  async fetchResume(resumeId: string) {
    return http.get<IResume>(`/resume/${resumeId}`);
  },
  async fetchViews(resumeId: string, params?: { lastDays: number }) {
    return http.get<IResumeViewResponse>(`/resume/${resumeId}/view`, {
      params
    } );
  },


  async updateSkill(resumeId: string, skillId: string, level: number) {
    return http.put(`/resume/${resumeId}/skill/${skillId}`, { level });
  },
  async updateExperience(
    resumeId: string,
    experienceId: string,
    data: Partial<ICreateExperience>
  ) {
    if (!data.end_date) {
      delete data.end_date;
    }
    return http.put(`/resume/${resumeId}/experience/${experienceId}`, data);
  },
  async updateResume(resumeId: string, data: Partial<ICreateResumeRequest>) {
    return http.put(`/resume/${resumeId}`, data);
  },

  async deleteSkill(resumeId: string, skillId: string) {
    return http.delete(`/resume/${resumeId}/skill/${skillId}`);
  },
  async deleteExperience(resumeId: string, experienceId: string) {
    return http.delete(`/resume/${resumeId}/experience/${experienceId}`);
  },
  async deleteResume(resumeId: string) {
    return http.delete(`/resume/${resumeId}`);
  },
};
