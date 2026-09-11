export interface Product {
  _id?: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  images?: string[];
  badge?: "Bestseller" | "New";
  rating: number;
  reviews: number;
  price: number;
  compareAtPrice?: number;
  description: string;
  sizes: string[];
  finishes: string[];
}