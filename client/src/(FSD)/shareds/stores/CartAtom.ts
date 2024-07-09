import { atom } from "recoil";

export const cartTotalState = atom({
    key: 'cartTotalState',
    default: {
        totalItems: 0,
        totalPrice: 0,
    },
});