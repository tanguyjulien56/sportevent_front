interface AuthSignin {
    email: string;
    password: string;
}
export declare function login(body: AuthSignin): Promise<any>;
export declare const isAuthenticated: () => boolean;
export {};
