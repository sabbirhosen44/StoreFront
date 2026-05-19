import { UserRound, Search, Heart, ShoppingCart } from "lucide-react";
import { NavLink, HeaderAction } from "@/types/navigation";

export const NAV_LINKS: NavLink[] = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Products", href: "/products" },
    { id: 3, label: "About", href: "/about" },
    { id: 4, label: "Contact", href: "/contact" },
];

export const HEADER_ACTIONS: HeaderAction[] = [
    { id: 1, icon: UserRound, label: "Account", showOnMobile: true },
    { id: 2, icon: Search, label: "Search", showOnMobile: true },
    { id: 3, icon: Heart, label: "Wishlist", showOnMobile: false },
    { id: 4, icon: ShoppingCart, label: "Cart", showOnMobile: true, hasBadge: true },
];

export const HELP_LINKS: NavLink[] = [
    { id: 1, label: "Payment Options", href: "/payment" },
    { id: 2, label: "Returns", href: "/returns" },
    { id: 3, label: "Privacy Policies", href: "/privacy" },
];