import { atom } from "recoil";

export const cartTotalState = atom({
    key: "cartTotalState",
    default: {
        totalItems: 0,
        totalPrice: 0,
    },
});

export const cartAddState = atom<any>({
    key: "cart_add_state",
    default: {
        userId: 0,
        productColorSizeId: 0,
        productImageId: 0,
        quantity: 0
    },
});

export const cartUpdateState = atom<any>({
    key: "cart_update_state",
    default: {
        quantity: 0,
        isSelected: true,
        price: 0
    },
});