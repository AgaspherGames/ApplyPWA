export interface Internship {
  id: string;
  name: string;
  description: string;
  company: {
    id: string;
    name: string;
    avatar: string;
  };
  city: {
    id: number;
    name: string;
    area_id: number;
  };
  is_paid: boolean;
  is_active: boolean;
  max_interns: number;
  attachment: string;
  keywords: string[];
  created_at: string;
}

export interface IFilterParams {
  name?: string;
  cursor?: string;
  isActive?: boolean;
  isPaid?: boolean;
  maxInterns?: number;
  companyId?: string;
  city?: number
}
