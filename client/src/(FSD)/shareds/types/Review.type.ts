export interface ReviewType {
    reviewId: number;
    productId: number;
    userId: number;
    text: string;
    star: number;
    reviewDate: string;
    nickname: string;
    size: string;
    productImages: Uint8Array[];
    reviewDetailImages: Uint8Array[];
}