import { Schema, models, model } from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  description?: string;
  image: string;
  featured: boolean;
  order: number;
  productCount: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    productCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Category || model<ICategory>("Category", CategorySchema);