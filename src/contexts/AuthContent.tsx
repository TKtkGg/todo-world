import { createContext, useContext, useState, type ReactNode } from "react";
import type { MeResponse } from "../api/auth"

type AuthContextType = {
    user: MeResponse | null;
    setUser: (user: MeResponse | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

type Props = { children: ReactNode };

export function AuthProvider({children}: Props) {
    const [user, setUser] = useState<MeResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    return(
        <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}