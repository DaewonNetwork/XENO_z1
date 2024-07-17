"use client";

import { Button } from "@nextui-org/button";
import React from "react";

import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

import { useRecoilValue, useSetRecoilState } from "recoil";


import { useProductOrder } from "../api/useProductAddOrder";
import { reqState } from "@/(FSD)/shareds/stores/ProductAtom";
import { ProductOrderInfoType } from "@/(FSD)/shareds/types/product/ProductOrderBar.type";
import { useRouter } from "next/navigation";
import { UserType } from "@/(FSD)/shareds/types/User.type";
import { useUserRead } from "@/(FSD)/entities/user/api/useUserRead";


interface ProductPaymentBtnType {
    productList: ProductOrderInfoType[];
}


export interface ProductOrderType {
    orderPayId: string;
    productColorSizeId: number;
    req: string;
    quantity: number;
    amount: number;
    orderNumber?: number;
}

const ProductPaymentBtn = ({ productList }: ProductPaymentBtnType) => {
    const req = useRecoilValue(reqState);
    const router = useRouter();

    const onSuccess = (data: any) => {
        // setOrdersCompleteInfo(data)
        router.push('/order/complete')
    }

    const { data } = useUserRead();

    const { mutate } = useProductOrder({ onSuccess });

    const user: UserType = data;

    const generateRandomId = () => {
        const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
        const array = new Uint8Array(length);
        window.crypto.getRandomValues(array);
        return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join("");
    };

    const generateRandomInt = (min: number, max: number): number => {
        const byteArray = new Uint32Array(1);
        window.crypto.getRandomValues(byteArray);
        const randomNum = byteArray[0] / (0xFFFFFFFF + 1);
        return Math.floor(randomNum * (max - min + 1)) + min;
    }

    const generateCustomerKey = (): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=.@';
        let key = '';
        while (!/[\-_=.@]/.test(key) || !/[A-Z]/.test(key) || !/[a-z]/.test(key) || !/[0-9]/.test(key)) {
            key = '';
            for (let i = 0; i < 50; i++) {
                key += chars.charAt(generateRandomInt(0, chars.length - 1));
            }
        }
        return key;
    }



    const orderId = generateRandomId();

    const orderName: string =
        productList.length > 1
            ? `${productList[0]?.name} 외 ${productList.length - 1}건`
            : productList[0]?.name ?? '';

    const totalPrice = productList.reduce((accumulator, product) => accumulator + product.price, 0);

    const productOrderList: ProductOrderType[] = productList.map(product => ({
        orderPayId: orderId,
        productColorSizeId: product.productColorSizeId,
        req: req,
        quantity: product.quantity,
        amount: product.price,
    }));



        const handleClick = async () => {

        const customerKey = generateCustomerKey();

        const tossPayments = await loadTossPayments("test_ck_Z1aOwX7K8m4b7av0xO6WryQxzvNP");

        const payment = tossPayments.payment({ customerKey: customerKey });

        await payment.requestPayment({
            method: "CARD",
            amount: {
                currency: "KRW",
                value: totalPrice
            },
            orderId: orderId,
            orderName: orderName,
            customerEmail: user.email,
            card: {
                useEscrow: false,
                flowMode: "DEFAULT",
                useCardPoint: false,
                useAppCardOnly: false,
            },
        }).then(data => {

            mutate(productOrderList);

        }).catch(error => {
            console.log("결제오류", error)
        });
    };

    return (
        <Button onClick={handleClick} fullWidth color={"primary"}>{totalPrice.toLocaleString()}원 결제하기</Button>
    );
};

export default ProductPaymentBtn;