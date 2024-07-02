export interface MutationType {
    onSuccess: (data: any) => void;
    onError?: () => void;
}

export interface MutationNullType {
    onSuccess?: () => void;
    onError?: () => void;
}