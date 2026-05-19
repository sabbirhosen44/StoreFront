import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types/auth";
import { LoginFormValues, RegisterFormValues } from "@/schemas/auth";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const initialState: AuthState = {
    user: null,
    accessToken: Cookies.get("access_token") || null,
    isLoading: false,
    error: null,
};

// Async Thunk: Handles Login & Fetching User Profile Context
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: LoginFormValues, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (!res.ok) throw new Error("Invalid email or password");
            const tokens = await res.json();

            const profileRes = await fetch(`${API_BASE}/auth/profile`, {
                headers: { Authorization: `Bearer ${tokens.access_token}` },
            });

            if (!profileRes.ok) throw new Error("Failed to load user profile");
            const user: User = await profileRes.json();

            Cookies.set("access_token", tokens.access_token, { expires: 7, secure: true });

            return { user, accessToken: tokens.access_token };
        } catch (err: any) {
            return rejectWithValue(err.message || "An authentication error occurred");
        }
    }
);

// Async Thunk: Handles User Registration (using user creation endpoint)
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData: RegisterFormValues, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_BASE}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to create user account");
            }

            const newUser: User = await res.json();
            return newUser;
        } catch (err: any) {
            return rejectWithValue(err.message || "Registration sequence failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.error = null;
            Cookies.remove("access_token");
        },
        setProfile: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login Life Cycle
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Register Life Cycle
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, setProfile } = authSlice.actions;
export default authSlice.reducer;