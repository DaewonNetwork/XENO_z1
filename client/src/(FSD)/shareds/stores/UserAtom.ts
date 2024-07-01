import { atom } from "recoil";

export const userState = atom({
    key: "userAtom",
    default: {
        isLoggedIn: false,
        accessToken: "",
        refreshToken: "",
    }
});