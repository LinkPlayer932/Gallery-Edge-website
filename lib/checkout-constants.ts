export type ShippingMethod = "standard" | "express" | "overnight";

export const SHIPPING_COSTS: Record<ShippingMethod, number> = {
  standard: 0,
  express: 28,
  overnight: 49,
};

export const SHIPPING_OPTIONS: { value: ShippingMethod; label: string; price: number }[] = [
  { value: "standard", label: "Standard Shipping (3-5 days)", price: 0 },
  { value: "express", label: "Express Shipping (1-2 days)", price: 28 },
  { value: "overnight", label: "Overnight (Next business day)", price: 49 },
];
