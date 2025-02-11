import React, { ReactNode } from "react";
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}
export declare const UserProvider: React.FC<{
    children: ReactNode;
}>;
export declare const useUser: () => UserContextType;
export interface User {
    id: string;
    email: string;
    password: string;
    status: string;
    created_at: string;
    updated_at: string;
    refreshToken: string;
    role: string;
}
export {};
