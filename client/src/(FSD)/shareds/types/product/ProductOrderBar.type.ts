export type ProductOrderInfoType = {
    productColorSizeId: number;
    productColorId?: number;
    color: string;
    size: string;
    quantity: number;
    price: number;
    name?: string;
    image?: Uint8Array | null
};

