export interface ICreateResumeRequest {
  position: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  birthday: string;
  email: string;
  city_id: number;
  description: string;
  status?: ResumeStatuses;
}

export interface ICreateResponse {
  id: string;
}

export interface IExperience {
  id: string;
  position: string;
  company: string;
  start_date: string;
  end_date?: string;
  description: string;
}
export type ICreateExperience = Omit<IExperience, "id">;

export interface IResume {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  birthday: string;
  email: string;
  phone: string;
  city: {
    area_id: number;
    id: number;
    name: string;
  };
  position: string;
  description: string;
  image: string;
  status: ResumeStatuses;
  experience: IExperience[];
  skills: ISkill[];
}

export interface ISkill {
  id: string;
  skill_name: string;
  level: number;
}

export interface IResumeView {
  "id": string,
  "resume_id": string,
  "company_id": string,
  "company_name": string,
  "company_avatar": string,
  "viewed_at": string
}
export interface IResumeViewResponse {
  "views": IResumeView[],
  "total": number
}

export type ICreateSkill = Omit<ISkill, "id">;

export type ResumeStatuses =
  | "active_search"
  | "looking_for_offers"
  | "has_internship_offer"
  | "inactive";
