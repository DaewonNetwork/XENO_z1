import { atom } from "recoil";

export const productImagesState = atom<any>({
    key: "product_img_state",
    default: [],
});

export const productDetailImageState = atom<any>({
    key: "product_detail_img_state",
    default: [],
});