import { ProductActionItem } from "@/types/product";
import { ArrowRightLeft, Heart, Share2 } from "lucide-react";

export const PRODUCT_ACTIONS: ProductActionItem[] = [
  {
    label: "Share",
    icon: <Share2 className="size-4" />,
    log: "Share:",
  },
  {
    label: "Compare",
    icon: <ArrowRightLeft className="size-4" />,
    log: "Compare:",
  },
  {
    label: "Like",
    icon: <Heart className="size-4" />,
    log: "Like:",
  },
];
