import { JSX } from "react";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
        id: number;
        name: string;
        image: string;
    };
}


export interface ProductActionItem {
    label: string;
    icon: JSX.Element;
    log: string;
}