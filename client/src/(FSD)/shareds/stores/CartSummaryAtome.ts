import { atom } from "recoil";

export const cartSummaryRefetchState = atom<any | null>({
    key: "cartSummaryRefetchState",
    default: null,
});