export type MetalPrice = {
  id: string;
  name: string; // e.g., Gold
  unit: "oz" | "g";
  price: number; // per unit
};

export type PricingStructure = {
  id: string;
  name: string;           // e.g., "Standard", "Preferred Supplier"
  description?: string;
  multiplier: number;     // applied to base prices for this structure
};

export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  pricingStructureId?: string;
};
