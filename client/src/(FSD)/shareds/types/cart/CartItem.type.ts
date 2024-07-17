export interface CartItemType {
    cartId: number;
    productsColorSizeId: number;
    quantity: number;
    price: number;
    brandName: string;
    productImage: Uint8Array;
    priceSale: number | undefined;
    sale: boolean;
    productName: string;
}