"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk"

interface ProductPaymentBtnType {
    product: ProductType;
}

const ProductPaymentBtn = ({ product }: ProductPaymentBtnType) => {
    const handleClick = async () => {
        const tossPayments = await loadTossPayments("test_ck_Z1aOwX7K8m4b7av0xO6WryQxzvNP");

        const payment = tossPayments.payment({ customerKey: "a8s7d8asd" });

        await payment.requestPayment({
            method: "CARD",
            amount: {
                currency: "KRW",
                value: product.price
            },
            orderId: "q6bxUBH3NTaBGL99FGPpq",
            orderName: product.productName,
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
            card: {
                useEscrow: false,
                flowMode: "DEFAULT",
                useCardPoint: false,
                useAppCardOnly: false,
            },
        });
    };

    return (
        <Button onClick={handleClick} fullWidth color={"primary"}>결제하기</Button>
    );
};

export default ProductPaymentBtn;