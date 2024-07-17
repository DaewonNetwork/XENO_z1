import { atom } from "recoil";

export const cartProductInfoListRefetchState = atom<any | null>({
    key: "cartProductInfoListRefetchState",
    default: null,
});