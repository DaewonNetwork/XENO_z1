import { atom } from "recoil";

export const cartProductInfoListRefetchState = atom<any | null>({
    key: "cartProductInfoListRefetchState",
    default: null,
});

export const cartProductQuantityState = atom<number>({
    key: "cartProductQuantityState",
    default: 0,
});