export interface FetchType {
    path: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    contentType?: string;
    isAuthRequired?: boolean;
    isNotAuthRequired?: boolean;
    body?: any;
}