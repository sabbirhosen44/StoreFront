"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export default function AdminUsersDirectory() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    fetch(`${API_BASE}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [API_BASE]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-heading">
          User Base Registry
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor registrations, search attributes, and inspect access
          configurations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search accounts by name or email strings..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-11 bg-card border border-border rounded-xl pl-10 pr-4 text-sm focus-visible:ring-furniro-gold"
          />
        </div>
        <div className="w-full sm:w-[180px]">
          <Select
            value={roleFilter}
            onValueChange={(val) => {
              setRoleFilter(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-11 rounded-xl bg-card border border-border text-sm font-medium focus:ring-furniro-gold">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="customer">Customer Access</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedUsers.map((user, index) => (
          <div
            key={user.id}
            style={{ animationDelay: `${index * 30}ms` }}
            className="p-5 bg-card border border-border rounded-2xl flex flex-col items-center text-center relative overflow-hidden shadow-xs animate-in fade-in slide-in-from-bottom-3 duration-300 fill-mode-both hover:border-furniro-gold/30 transition-all group"
          >
            <span
              className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
                user.role === "admin"
                  ? "bg-furniro-gold/10 text-furniro-gold border border-furniro-gold/20"
                  : "bg-accent text-muted-foreground"
              }`}
            >
              {user.role}
            </span>
            <img
              src={user.avatar}
              alt=""
              className="size-16 rounded-full object-cover border border-border bg-muted mb-3 transition-transform duration-300 group-hover:scale-105"
            />
            <p className="font-heading font-semibold text-sm tracking-tight truncate max-w-full text-foreground mb-0.5">
              {user.name}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-full mb-4">
              {user.email}
            </p>
            <div className="w-full pt-3 border-t border-border/60 flex justify-center gap-1.5 text-xs text-muted-foreground/80">
              {user.role === "admin" ? (
                <Shield className="size-3.5 text-furniro-gold" />
              ) : (
                <User className="size-3.5" />
              )}
              <span className="capitalize">{user.role} profile</span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs font-medium text-muted-foreground">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="h-9 px-3 border border-border rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="size-3.5" /> Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="h-9 px-3 border border-border rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
            >
              Next <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
