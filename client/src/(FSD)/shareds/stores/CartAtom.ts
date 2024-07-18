import { atom } from "recoil";
import { OrderProductInfoType } from "../types/product/OrderProductInfo.type";

export const cartTotalState = atom({
    key: "cartTotalState",
    default: {
        totalItems: 0,
        totalPrice: 0,
    },
});


export const cartState = atom<OrderProductInfoType[]>({
    key: "cartState",
    default: [],
});

