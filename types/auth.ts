export interface User {
    id: number;
    email: string;
    name: string;
    role: "customer" | "admin";
    avatar: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
}