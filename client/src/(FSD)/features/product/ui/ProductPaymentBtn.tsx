import { Button } from "@nextui-org/button";
import React from "react";
import { usePaymentAction } from "../api/useProductPayment";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";

// 버튼 컴포넌트의 props 타입 정의
interface ProductPaymentBtnProps {
    product: ProductType;
}

// 결제 버튼 컴포넌트
const ProductPaymentBtn = ({ product }: ProductPaymentBtnProps) => {
    // usePaymentAction 훅을 사용하여 결제 관련 상태와 액션 가져오기
    const { action, isSuccess, isPending, error } = usePaymentAction({ product });

    // 버튼 클릭 핸들러
    const onClick = () => {
        action();   // 결제 액션 실행
    };

    return (
        <>
            <Button 
                onClick={onClick} fullWidth color="primary"
                disabled={isPending}    // 결제 진행 중일 때는 버튼 비활성화
            >
                {isPending ? "처리 중" : "결제하기"}
            </Button>
            {isSuccess && <p>결제 완료</p>}    {/* 결제 성공 시 메시지 표시 */}
            {error && (
                <p style={{ color: "red" }}>
                    결제 중 오류가 발생했습니다: {error.message}
                </p>
            )}
        </>
    );
};

export default ProductPaymentBtn;
