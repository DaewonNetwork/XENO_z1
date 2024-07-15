import { atom } from "recoil";

export const productImagesState = atom<any>({
    key: "product_img_state",
    default: null,
});

export const productDetailImageState = atom<any>({
    key: "product_detail_img_state",
    default: null,
});