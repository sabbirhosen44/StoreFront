"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CategoryFormValues, categorySchema } from "@/schemas/category";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  image: string;
}

export default function AdminCategoriesPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchCategories = () => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setFormData(
      category
        ? { name: category.name, image: category.image }
        : { name: "", image: "" }
    );
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CategoryFormValues = {
      name: formData.name,
      image: formData.image,
    };
    const validation = categorySchema.safeParse(payload);
    if (!validation.success) {
      const fErr: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) fErr[err.path[0].toString()] = err.message;
      });
      setErrors(fErr);
      return;
    }

    const url = editingCategory
      ? `${API_BASE}/categories/${editingCategory.id}`
      : `${API_BASE}/categories/`;
    const method = editingCategory ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        fetchCategories();
        setIsModalOpen(false);
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this category?")) {
      fetch(`${API_BASE}/categories/${id}`, { method: "DELETE" }).then(
        (res) => {
          if (res.ok) fetchCategories();
        }
      );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-heading">
            Global Categories Setup
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage organizational store taxonomy nodes dynamically.
          </p>
        </div>
        <Button
          onClick={() => openModal(null)}
          className="h-11 px-4 rounded-xl bg-furniro-gold hover:bg-furniro-gold/90 text-white flex items-center justify-center gap-2 font-medium cursor-pointer transition-transform duration-200 active:scale-95"
        >
          <Plus className="size-4" />
          <span>Add New Category</span>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div
            key={category.id}
            style={{ animationDelay: `${index * 40}ms` }}
            className="p-4 bg-card border border-border rounded-2xl flex items-center justify-between shadow-xs hover:border-furniro-gold/40 transition-all group animate-in fade-in slide-in-from-bottom-3 duration-300 fill-mode-both"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={category.image}
                alt=""
                className="size-12 rounded-xl object-cover bg-muted border border-border transition-transform duration-300 group-hover:scale-105"
              />
              <p className="font-heading font-semibold text-sm text-foreground truncate">
                {category.name}
              </p>
            </div>
            <div className="flex items-center gap-0.5 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openModal(category)}
                className="p-2 text-muted-foreground hover:text-furniro-gold rounded-lg cursor-pointer"
              >
                <Edit2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(category.id)}
                className="p-2 text-muted-foreground hover:text-destructive rounded-lg cursor-pointer"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory
                ? "Update Category Node"
                : "Create Category Node"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-muted-foreground block">
                Category Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full h-11 border border-border rounded-xl bg-background px-3 text-sm focus-visible:ring-furniro-gold"
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-muted-foreground block">
                Category Image URL
              </label>
              <Input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full h-11 border border-border rounded-xl bg-background px-3 text-sm focus-visible:ring-furniro-gold"
              />
              {errors.image && (
                <p className="text-xs text-destructive">{errors.image}</p>
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
                Apply Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
