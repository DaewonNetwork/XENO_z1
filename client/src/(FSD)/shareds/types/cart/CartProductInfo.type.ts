export interface CartProductInfoType {
    cartId: number;
    productsColorSizeId: number;
    quantity: number;
    amount: number;
    brandName: string;
    productImage: Uint8Array;
    sale: boolean;
    productName: string;
    color: string;
    size: string;
    price: number;
}