import { ICompany } from "../../company";

export interface ICreateApplicationRequest {
  resume_id: string;
  internship_id: string;
  cover_letter?: string;
}

export interface IApplication {
  id: number;
  user_id: string;
  resume_id: string;
  internship: {
    id: string;
    name: string;
  };
  status: ApplicationStatus;
  company: ICompany;
  created_at: string;
  updated_at: string;
  chat_id: string;
}

export type ApplicationStatus = "pending" | "invite" | "declined";
