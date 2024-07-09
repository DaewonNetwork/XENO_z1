// src/atoms/categoryAtoms.ts

import { ProductImages } from "@/(FSD)/entities/product/ui/RelatedColorProducts";
import { ProductList } from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { atom } from "recoil";

export const nameState = atom<string>({
    key: "nameState", // 고유한 키 값으로, 다른 atom과 구분짓는 역할을 합니다.
    default: '', // 초기값 설정
});




export const imageState = atom<ProductImages[]>({
    key: "imageState", // 고유한 키 값으로, 다른 atom과 구분짓는 역할을 합니다.
    default: [], // 초기값 설정
})

export const productsState = atom<ProductList[]>({
    key: "productsState", // 고유한 키 값으로, 다른 atom과 구분짓는 역할을 합니다.
    default: [], // 초기값 설정
})


export const priceState = atom<number>({
    key: "priceState", // 고유한 키 값으로, 다른 atom과 구분짓는 역할을 합니다.
    default: 0, // 초기값 설정
})

export const reqState = atom<string>({
    key: "reqState", // 고유한 키 값으로, 다른 atom과 구분짓는 역할을 합니다.
    default: '요청사항 없음', // 초기값 설정
})
