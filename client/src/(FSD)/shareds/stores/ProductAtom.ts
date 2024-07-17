import { atom } from "recoil";
import { OrderProductInfoType } from "../types/product/OrderProductInfo.type";
import { ProductImages } from "@/(FSD)/widgets/product/ui/ProductOtherColorImageList";

export const nameState = atom<string>({
    key: "nameState",
    default: "",
});

export const imageState = atom<ProductImages[]>({
    key: "imageState",
    default: [],
})

export const productsState = atom<OrderProductInfoType[]>({
    key: "productsState",
    default: [],
});

export const priceState = atom<number>({
    key: "priceState",
    default: 0,
});

export const reqState = atom<string>({
    key: "reqState",
    default: ""
});
