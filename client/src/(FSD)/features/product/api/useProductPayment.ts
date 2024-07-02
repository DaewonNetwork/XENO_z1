"use server";

import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { useMutation } from "@tanstack/react-query";

// 결제 액션에 필요한 매개변수 타입 정의
interface PaymentActionType {
    product: ProductType;
}

// 결제 함수의 타입 정의
type PaymentFunction = (product: ProductType) => Promise<any>;

// 실제 결제 로직을 수행하는 함수
const performPayment: PaymentFunction = async (product) => {
    // 여기서 실제 결제 API를 호출함.
    const res = await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify(product),
    });
    if (!res.ok) {
        throw new Error('Payment failed');
    }
}

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