import { createContext } from "react";

export interface UserContextInterface {
    isAuthenticated: boolean;
    currentRole: string;
}

export const UserCtx = createContext<UserContextInterface | null>(null);
