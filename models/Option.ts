import { Schema, models, model } from "mongoose";

export interface IOption {
  type: "size" | "color";
  value: string;
}

const OptionSchema = new Schema<IOption>(
  {
    type: { type: String, enum: ["size", "color"], required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

// Same type + same value dobara add nahi ho sakta
OptionSchema.index({ type: 1, value: 1 }, { unique: true });

export default models.Option || model<IOption>("Option", OptionSchema);