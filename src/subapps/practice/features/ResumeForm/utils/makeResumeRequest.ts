import {
  ICreateResumeRequest,
  IResume,
} from "@/subapps/practice/entities/resume";

export default function makeResumeRequest(
  resume: IResume,
  data: Partial<ICreateResumeRequest>
) {
  const { id, user_id, city, image, experience, skills, ...resumeData } =
    resume;
  const resumeRequest: ICreateResumeRequest = {
    ...resumeData,
    city_id: resume.city.id,
  };
  return { ...resumeRequest, ...data };
}
