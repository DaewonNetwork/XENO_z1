export interface CartItem {
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