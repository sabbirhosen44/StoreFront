"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { logout, setProfile } from "@/store/slices/authSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const token = Cookies.get("access_token") || accessToken;

    if (token && !user) {
      fetch(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Session expired");
          return res.json();
        })
        .then((profileData) => {
          dispatch(setProfile(profileData));
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }, [dispatch, user, accessToken, API_BASE]);

  return <>{children}</>;
}
