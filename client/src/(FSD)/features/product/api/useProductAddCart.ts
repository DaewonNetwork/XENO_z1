"use server";


import { ProductList } from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { useMutation } from "@tanstack/react-query";

interface addToCartActionType {
    products: ProductList[];
}

type addToCartFunction = (products: ProductList[]) => Promise<void>;


const addToCart:addToCartFunction = async (products) => {
    try {
        const res = await fetch("/api/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
        });

        if (!res.ok) {
            throw new Error("결제 처리 중 오류가 발생했습니다.");
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
};


// 결제 액션을 위한 커스텀 훅
export const useProductAddCart = ({ products }:addToCartActionType ) => {
    const { mutate, isSuccess, isPending, error } = useMutation({
        mutationFn: () => addToCart(products),
    });

    return {
        action: () => mutate,   // 결제 액션 실행 
        isSuccess,              // 결제 성공 여부
        isPending,              // 결제 진행 중 여부
        error                   // 결제 중 발생한 오류
    };
};