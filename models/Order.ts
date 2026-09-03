import { Schema, models, model, Types } from "mongoose";

export interface IOrderItem {
  productId?: Types.ObjectId;
  name: string;
  size?: string;
  finish?: string;
  quantity: number;
  price: number;
}

export interface IShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface IOrder {
  orderNumber: string;
  customer: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  payment: "Paid" | "Unpaid" | "Refunded";
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: IShippingAddress;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: false },
    name: { type: String, required: true },
    size: { type: String },
    finish: { type: String },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const ShippingAddressSchema = new Schema<IShippingAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    items: { type: [OrderItemSchema], default: [] },
    total: { type: Number, required: true },
    payment: { type: String, enum: ["Paid", "Unpaid", "Refunded"], default: "Unpaid" },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: { type: ShippingAddressSchema, required: true },
  },
  { timestamps: true }
);

export default models.Order || model<IOrder>("Order", OrderSchema);
