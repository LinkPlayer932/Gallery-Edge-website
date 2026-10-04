import { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface ICustomer {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  totalOrders: number;
  totalSpent: number;
  comparePassword?: (candidate: string) => Promise<boolean>;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, select: false },
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Hash password before saving, only if it was modified
CustomerSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance method to compare passwords
CustomerSchema.methods.comparePassword = async function (candidate: string) {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

export default models.Customer || model<ICustomer>("Customer", CustomerSchema);