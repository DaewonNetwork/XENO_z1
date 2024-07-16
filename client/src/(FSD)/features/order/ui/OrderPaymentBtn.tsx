"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useRecoilValue } from "recoil";
import { useProductOrder } from "../../product/api/useProductAddOrder";
import { reqState } from "@/(FSD)/shareds/stores/ProductAtom";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import { useRouter } from "next/navigation";

export interface ProductOrderType {
    orderPayId: string;
    productColorSizeId: number;
    req: string;
    quantity: number;
    amount: number;
    orderNumber?: number;
}

interface OrderPaymentBtnProps {
    productList: OrderProductInfoType[];
}

const OrderPaymentBtn = ({ productList }: OrderPaymentBtnProps) => {
    const req = useRecoilValue(reqState);
    const router = useRouter();

    const onSuccess = (data: any) => {
        console.log("post 성공");
        localStorage.removeItem("newProducts");
        router.push("/order/complete")
    }

    const { mutate } = useProductOrder({ onSuccess });

 
   

    const generateRandomId = () => {
        const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
        const array = new Uint8Array(length);
        window.crypto.getRandomValues(array);
        return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join("");
    };

    const orderId = generateRandomId();

    const orderName: string =
        productList.length > 1
            ? `${productList[0]?.name} 외 ${productList.length - 1}건`
            : productList[0]?.name ?? "";

    const totalPrice = productList.reduce((accumulator, product) => accumulator + product.price, 0);

    const OrderInfoList: ProductOrderType[] = productList.map(product => ({
        orderPayId: orderId,
        productColorSizeId: product.productColorSizeId,
        req: req,
        quantity: product.quantity,
        amount: product.price,
    }));

  

    const handleClick = async () => {
        const tossPayments = await loadTossPayments("test_ck_Z1aOwX7K8m4b7av0xO6WryQxzvNP");
        const payment = tossPayments.payment({ customerKey: "a8s7d8asd" });

        mutate(OrderInfoList);

        await payment.requestPayment({
            method: "CARD",
            amount: {
                currency: "KRW",
                value: totalPrice
            },
            orderId: orderId,
            orderName: orderName,
            customerEmail: "user.email",
            card: {
                useEscrow: false,
                flowMode: "DEFAULT",
                useCardPoint: false,
                useAppCardOnly: false,
            },
        }).then((data :any) => {
          

        }).catch((error: any) => {
            console.log("결제오류", error)
        });
    };

    return (
        <Button onClick={handleClick} fullWidth color={"primary"}>{totalPrice.toLocaleString()}원 결제하기</Button>
    );
};

export default OrderPaymentBtn;