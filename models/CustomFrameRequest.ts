import { Schema, models, model } from "mongoose";

const CustomFrameRequestSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    width: { type: String, required: true },
    height: { type: String, required: true },
    unit: { type: String, required: true },
    notes: { type: String },
    referenceImageUrl: { type: String },
  },
  { timestamps: true }
);

export default models.CustomFrameRequest || model("CustomFrameRequest", CustomFrameRequestSchema);