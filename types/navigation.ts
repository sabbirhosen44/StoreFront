import { LucideIcon } from "lucide-react";

export interface NavLink {
    id: number;
    label: string;
    href: string;
}

export interface HeaderAction {
    id: number;
    icon: LucideIcon;
    label: string;
    showOnMobile: boolean;
    hasBadge?: boolean;
}