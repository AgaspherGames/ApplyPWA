import { IUser } from "@/entities/user/model/types";
import { ICompany } from "../../company";
import { Internship } from "../../internship";
import { MessageSenderType, MessageType } from "../../message";
import { ApplicationStatus } from "../../application/model/types";

export interface IChatsResponse {
  chats: Chat[];
}

export interface IChat {
  id: string;
  user: IUser;
  company: ICompany;
  internship: Internship;
  created_at: string;
  last_message?: ILastMessage;
  application_id: IApplication;
}

interface IApplication {
  id: number;
  user_id: string;
  resume_id: string;
  company_id: string;
  internship_id: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface IChatInternship {
  id: string;
  name: string;
}

export interface ILastMessage {
  id: number;
  chat_id: string;
  sender_id: string;
  sender_type: MessageSenderType;
  type: MessageType;
  text: string;
  is_viewed: boolean;
  is_edited: boolean;
  created_at: string;
}
