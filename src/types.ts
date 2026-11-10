export type IconName =
  | "arrow"
  | "recycle"
  | "leaf"
  | "check"
  | "search"
  | "metal"
  | "bottle"
  | "box"
  | "monitor"
  | "scale"
  | "chat"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "plus"
  | "close"
  | "menu"
  | "info"
  | "copy"
  | "truck"
  | "chevron";

export type Material = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  examples: string;
  prep: string;
  note: string;
  image?: string;
  icon: IconName;
  color: string;
};

export type Channel = "WhatsApp" | "Instagram" | "Facebook";
export type EstimateRow = { id: number; material: string; weight: string };
