"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

interface ProductPaymentBtnType {
    product: ProductType;
}

const ProductPaymentBtn = ({ product }: ProductPaymentBtnType) => {
    const generateRandomId = () => {
        const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
        const array = new Uint8Array(length);
        window.crypto.getRandomValues(array);
        
        return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join("");
    };

    const handleClick = async () => {
        const tossPayments = await loadTossPayments("test_ck_Z1aOwX7K8m4b7av0xO6WryQxzvNP");

        const payment = tossPayments.payment({ customerKey: "a8s7d8asd" });

        await payment.requestPayment({
            method: "CARD",
            amount: {
                currency: "KRW",
                value: product.price
            },
            orderId: generateRandomId(),
            orderName: product.productName,
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
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