import { describe, it, expect, beforeEach } from "vitest";
import authReducer, { logout, setProfile } from "@/store/slices/authSlice";
import { User } from "@/types/auth";

const mockUser: User = {
  id: 1,
  email: "admin@storefront.com",
  name: "Admin User",
  role: "admin",
  avatar: "https://placehold.co/100",
};

describe("Auth Slice Redux Reducer", () => {
  let initialState = {
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    initialState = {
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,
    };
  });

  it("should return initial state", () => {
    const state = authReducer(undefined, { type: "unknown" });
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it("should set profile user data on setProfile", () => {
    const newState = authReducer(initialState, setProfile(mockUser));
    expect(newState.user).toEqual(mockUser);
    expect(newState.user?.role).toBe("admin");
  });

  it("should clear user session on logout", () => {
    const loggedInState = {
      user: mockUser,
      accessToken: "mock-jwt-token",
      isLoading: false,
      error: null,
    };

    const loggedOutState = authReducer(loggedInState, logout());
    expect(loggedOutState.user).toBeNull();
    expect(loggedOutState.accessToken).toBeNull();
  });
});
