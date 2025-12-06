import { InferRawDocTypeFromSchema, Schema, model, models } from "mongoose";

export const ExperienceSchema = new Schema({
  title: String,
  company: String,
  address: String,
  startDate: String,
  endDate: String,
  summary: String,
});

const Experience = models.Experience || model("Experience", ExperienceSchema);
export type ExperienceType = InferRawDocTypeFromSchema<
  typeof ExperienceSchema
> & {
  _id?: string;
};

export default Experience;
