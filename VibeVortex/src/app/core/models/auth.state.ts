import { AuthToken } from "./auth.token";

export interface AuthState {
    token: string | null;
    decodedToken: AuthToken | null;
    isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
    token: null,
    decodedToken: null,
    isAuthenticated: false,
};
