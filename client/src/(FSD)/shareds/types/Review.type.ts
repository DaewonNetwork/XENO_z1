export interface ReviewType {
    reviewId: number;
    productId: number;
    userId: number;
    text: string;
    star: number;
    reviewDate: string;
    name: string;
    size: string;
    color: string;
    productImages: Uint8Array[];
    productName: string;
    reviewDetailImages: Uint8Array[];
    createdAt: string;
}