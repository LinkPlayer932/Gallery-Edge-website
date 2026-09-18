import { Schema, models, model } from "mongoose";

export interface ISizeVariant {
  size: string;
  price: number;
  compareAtPrice?: number;
}

export interface IProduct {
  name: string;
  slug: string;
  category: string; // category slug reference
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  badge?: "Bestseller" | "New" | "None";
  sizes: string[];
  sizeVariants?: ISizeVariant[];
  finishes: string[];
  images: string[];
  rating: number;
  reviews: number;
  status: "Active" | "Draft";
}

const SizeVariantSchema = new Schema<ISizeVariant>(
  {
    size: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    stock: { type: Number, default: 0 },
    badge: { type: String, enum: ["Bestseller", "New", "None"], default: "None" },
    sizes: { type: [String], default: [] },
    sizeVariants: { type: [SizeVariantSchema], default: [] },
    finishes: { type: [String], default: [] },
    images: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Draft"], default: "Active" },
  },
  { timestamps: true }
);

export default models.Product || model<IProduct>("Product", ProductSchema);