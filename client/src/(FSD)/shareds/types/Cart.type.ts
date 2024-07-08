export interface CartItem {
    sale: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    selected: boolean;
    productImage: Uint8Array | null;
}

export interface CartState {
    items: CartItem[];
}