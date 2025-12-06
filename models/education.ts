import { InferRawDocTypeFromSchema, Schema, model, models } from "mongoose";

export const EducationSchema = new Schema({
  name: String,
  address: String,
  qualification: String,
  year: String,
});

const Education = models.Education || model("Education", EducationSchema);
export type EducationType = InferRawDocTypeFromSchema<typeof EducationSchema>;

export default Education;
