export interface CartItemType {
    cartId: number;
    userId: number;
    productsColorSizeId: number;
    quantity: number;
    price: number;
    brandName: string;
    imageData: Uint8Array;
    priceSale: number | undefined;
    sale: boolean;
    productName: string;
}