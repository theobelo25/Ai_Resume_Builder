import { InferSchemaType, Schema, model, models } from "mongoose";

export const SkillSchema = new Schema({
  name: String,
  level: String,
});

const Skill = models.Skill || model("Skill", SkillSchema);
export type SkillType = InferSchemaType<typeof SkillSchema>;

export default Skill;
