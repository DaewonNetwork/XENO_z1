import { atom } from "recoil";

export const cartSummaryRefetchState = atom<any | null>({
    key: "cartSummaryRefetchState",
    default: null,
});

export const cartSummaryState = atom<number>({
    key: "cartSummaryState",
    default: 0
});