import { UserRound, Search, Heart, ShoppingCart } from "lucide-react";
import { NavLink, HeaderAction } from "@/types/navigation";

export const NAV_LINKS: NavLink[] = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Products", href: "/products" },
    { id: 3, label: "About", href: "/about" },
    { id: 4, label: "Contact", href: "/contact" },
];

export const HEADER_ACTIONS: HeaderAction[] = [
    { id: 1, icon: UserRound, label: "Account", showOnMobile: false },
    { id: 2, icon: Search, label: "Search", showOnMobile: true },
    { id: 3, icon: Heart, label: "Wishlist", showOnMobile: false },
    { id: 4, icon: ShoppingCart, label: "Cart", showOnMobile: true, hasBadge: true },
];