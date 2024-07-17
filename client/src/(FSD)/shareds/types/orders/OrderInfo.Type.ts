export interface OrderInfoType {
    orderId: number;
    orderDate: string;
    brandName: string;
    productName: string;
    size: string;
    color: string;
    status: string;
    amount: number;
    quantity: number;
    productImage: Uint8Array | null; // byte[]에 해당하는 ArrayBuffer로 처리

}
