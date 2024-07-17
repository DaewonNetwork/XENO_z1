// src/atoms/categoryAtoms.ts

import { atom } from "recoil";

export const categoryIdState = atom<string>({
    key: "categoryIdState", // 고유한 키 값으로, 다른 atom과 구분짓는 역할을 합니다.
    default: "000", // 초기값 설정
});

export const categorySubIdState = atom<string>({
    key: "categorySubIdState",
    default: "",
});
