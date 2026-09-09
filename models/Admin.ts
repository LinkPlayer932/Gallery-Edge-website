import { Schema, models, model } from "mongoose";

export interface IAdmin {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true, default: "Admin" },
    email: { type: String, required: true, default: "" },
    role: { type: String, default: "Store Owner" },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export default models.Admin || model<IAdmin>("Admin", AdminSchema);