import { atom } from "recoil";

export const isLoggedInState = atom<boolean>({
    key: "isLoggedInAtom",
    default: false
});