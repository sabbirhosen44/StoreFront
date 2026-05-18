import { JSX } from "react";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

export interface ProductActionItem {
  label: string;
  icon: JSX.Element;
  log: string;
}

export interface ProductsCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}
