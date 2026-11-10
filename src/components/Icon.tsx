import {
  ArrowRight,
  BottleWine,
  Camera,
  Check,
  ChevronDown,
  Copy,
  Info,
  Leaf,
  Menu,
  MessageCircle,
  Monitor,
  Package,
  Play,
  Plus,
  Recycle,
  Scale,
  Search,
  SquareStack,
  Truck,
  Music2,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "../types";

const icons: Record<IconName, LucideIcon> = {
  arrow: ArrowRight,
  recycle: Recycle,
  leaf: Leaf,
  check: Check,
  search: Search,
  metal: SquareStack,
  bottle: BottleWine,
  box: Package,
  monitor: Monitor,
  scale: Scale,
  chat: MessageCircle,
  whatsapp: MessageCircle,
  instagram: Camera,
  facebook: UsersRound,
  youtube: Play,
  tiktok: Music2,
  plus: Plus,
  close: X,
  menu: Menu,
  info: Info,
  copy: Copy,
  truck: Truck,
  chevron: ChevronDown,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const LucideIcon = icons[name];
  return <LucideIcon size={size} strokeWidth={1.65} aria-hidden="true" />;
}
