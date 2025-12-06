import { InferRawDocTypeFromSchema, Schema, model, models } from "mongoose";
import { ExperienceSchema } from "./experience";
import { EducationSchema } from "./education";
import { SkillSchema } from "./skill";

export const ResumeSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  title: String,
  name: String,
  job: String,
  address: String,
  phone: String,
  themeColor: String,
  summary: String,
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [SkillSchema],
});

const Resume = models.Resume || model("Resume", ResumeSchema);

export type ResumeType = InferRawDocTypeFromSchema<typeof ResumeSchema> & {
  _id?: string;
};

export default Resume;
