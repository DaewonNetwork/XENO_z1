"use server";

import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { useMutation } from "@tanstack/react-query";

// 결제 액션에 필요한 매개변수 타입 정의
interface PaymentActionType {
    product: ProductType;
}

// 결제 함수의 타입 정의
type PaymentFunction = (product: ProductType) => Promise<void>;

// 실제 결제 로직을 수행하는 함수
const performPayment: PaymentFunction = async (product) => {
    try {
        const res = await fetch("/api/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (!res.ok) {
            throw new Error("결제 처리 중 오류가 발생했습니다.");
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
};

// fetch 함수는 즉시 Promise를 반환하고 HTTP 응답으로 해결됨.
// await는 Promise가 해결될 때 까지 기다림
// 응답이 도착하면 await로 인해 일시중지 되었던 함수가 다시 실행되고 응답 객체가 res 변수에 할당됨.


// 결제 액션을 위한 커스텀 훅
export const usePaymentAction = ({ product }: PaymentActionType) => {
    const { mutate, isSuccess, isPending, error } = useMutation({
        mutationFn: () => performPayment(product),
    });

    return {
        action: () => mutate,   // 결제 액션 실행 
        isSuccess,              // 결제 성공 여부
        isPending,              // 결제 진행 중 여부
        error                   // 결제 중 발생한 오류
    };
};