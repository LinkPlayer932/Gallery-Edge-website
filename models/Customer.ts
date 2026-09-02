import { Schema, models, model } from "mongoose";

export interface ICustomer {
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Customer || model<ICustomer>("Customer", CustomerSchema);