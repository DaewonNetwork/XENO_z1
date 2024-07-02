export interface UserType {
    password: string;
    email: string;
    userId?: number;
    userName?: string;
    exp?: number;
    iat?: number;
    roles?: string[];
    brandName?: string;
};

export interface UserAtomType {
    accessToken?: string;
    refreshToken?: string;
    isLoggedIn?: boolean;
    user?: UserType | null;
};