export type ShippingMethod = "standard" | "express" | "overnight";

export const SHIPPING_COSTS: Record<ShippingMethod, number> = {
  standard: 0,
  express: 250,
  overnight: 450,
};

export const SHIPPING_OPTIONS: { value: ShippingMethod; label: string; price: number }[] = [
  { value: "standard", label: "Standard Delivery (3-5 days)", price: 0 },
  { value: "express", label: "Express Delivery (1-2 days)", price: 250 },
  { value: "overnight", label: "Overnight Delivery (Next business day)", price: 450 },
];
