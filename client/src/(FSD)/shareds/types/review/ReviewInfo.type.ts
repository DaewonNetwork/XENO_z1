export interface ReviewInfoType {
    reviewId: number;
    productId: number;
    userName: string;
    text: string;
    isReview: boolean;
    star: number;
    replyIndex: number;
    reviewImage: ArrayBuffer; // 혹은 Uint8Array 등으로 설정 가능
    createAt: string;
    isReply?: boolean;
}