import { Schema, models, model, Types } from "mongoose";

export interface IReview {
  _id?: string;
  productId: Types.ObjectId;
  name: string;
  email: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  status: "Approved" | "Pending" | "Rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true, default: "" },
    comment: { type: String, required: true, trim: true },
    verifiedPurchase: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Approved",
      index: true,
    },
  },
  { timestamps: true }
);

export default models.Review || model<IReview>("Review", ReviewSchema);
