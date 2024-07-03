import { atom } from "recoil";
import { UserAtomType } from "../types/User.type";

export const userState = atom<UserAtomType>({
    key: "userAtom",
    default: {
        user: null,
        isLoggedIn: false,
        accessToken: "",
        refreshToken: "",
    }
});