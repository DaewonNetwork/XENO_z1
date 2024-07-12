export interface UserType {
    password: string;
    email: string;
    userId?: number;
    name?: string;
    exp?: number;
    iat?: number;
    roles?: string[];
    brandName?: string;
    address?: string;
    phoneNumber?: string;
    companyId?: string;
};