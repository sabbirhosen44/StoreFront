"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFormValues, productSchema } from "@/schemas/product";
import { ChevronLeft, ChevronRight, Edit2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export default function AdminProductsPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  const LIMIT = 10;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [offset, setOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    image: "",
  });

  const fetchProducts = () => {
    fetch(`${API_BASE}/products?offset=${offset}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      price: "",
      description: "",
      categoryId: "",
      image: "",
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: String(product.price),
      description: product.description,
      categoryId: String(product.category?.id || ""),
      image: product.images[0] || "",
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ProductFormValues = {
      title: formData.title,
      price: Number(formData.price),
      description: formData.description,
      categoryId: Number(formData.categoryId),
      images: [formData.image],
    };

    const validation = productSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const url = editingProduct
      ? `${API_BASE}/products/${editingProduct.id}`
      : `${API_BASE}/products/`;
    const method = editingProduct ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          fetchProducts();
          setIsModalOpen(false);
        }
      })
      .catch(console.error);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      fetch(`${API_BASE}/products/${id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) fetchProducts();
        })
        .catch(console.error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-heading">
            Product Inventory Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Create, inspect, modify, and delete active inventory items.
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="h-11 px-4 rounded-xl bg-furniro-gold hover:bg-furniro-gold/90 text-white flex items-center justify-center gap-2 font-medium cursor-pointer transition-transform duration-200 active:scale-95"
        >
          <Plus className="size-4" />
          <span>Add New Product</span>
        </Button>
      </div>

      <div className="border border-border bg-card rounded-2xl overflow-hidden shadow-xs animate-in fade-in duration-400 delay-100">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-accent/40 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-4">Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-accent/20 transition-colors duration-150"
                >
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="size-10 rounded-lg object-cover border border-border bg-muted"
                    />
                    <span className="font-medium text-foreground max-w-xs truncate">
                      {product.title}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-accent rounded-md text-xs font-medium">
                      {product.category?.name}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-foreground">
                    ${product.price}
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(product)}
                        className="p-2 text-muted-foreground hover:text-furniro-gold rounded-lg cursor-pointer"
                      >
                        <Edit2 className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive rounded-lg cursor-pointer"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-medium text-muted-foreground">
          Showing offset indexes {offset} - {offset + LIMIT}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(0, offset - LIMIT))}
            className="h-9 w-9 rounded-lg border border-border flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOffset(offset + LIMIT)}
            className="h-9 w-9 rounded-lg border border-border flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct
                ? "Modify Product Details"
                : "Register New Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-muted-foreground block">
                Product Title
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full h-11 border border-border rounded-xl bg-background px-3 text-sm focus-visible:ring-furniro-gold"
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-muted-foreground block">
                  Price ($)
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full h-11 border border-border rounded-xl bg-background px-3 text-sm focus-visible:ring-furniro-gold"
                />
                {errors.price && (
                  <p className="text-xs text-destructive">{errors.price}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-muted-foreground block">
                  Category Classification
                </label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(val) =>
                    setFormData({ ...formData, categoryId: val })
                  }
                >
                  <SelectTrigger className="rounded-xl border border-border h-11 focus:ring-furniro-gold">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-xs text-destructive">
                    {errors.categoryId}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-muted-foreground block">
                Image URL string
              </label>
              <Input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full h-11 border border-border rounded-xl bg-background px-3 text-sm focus-visible:ring-furniro-gold"
              />
              {errors.images && (
                <p className="text-xs text-destructive">{errors.images}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-muted-foreground block">
                Item Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-border rounded-xl bg-background p-3 text-sm focus:outline-furniro-gold resize-none focus:ring-1 focus:ring-furniro-gold"
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="h-11 px-5 rounded-xl text-sm font-medium cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 px-5 rounded-xl bg-furniro-gold hover:bg-furniro-gold/90 text-white text-sm font-medium cursor-pointer"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
