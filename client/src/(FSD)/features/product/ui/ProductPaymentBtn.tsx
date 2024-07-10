"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { ProductList } from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { useRecoilValue } from "recoil";
import { userState } from "@/(FSD)/shareds/stores/UserAtom";

import { useProductOrder } from "../api/useProductAddOrder";
import { orderInfoState } from "@/(FSD)/shareds/stores/ProductAtom";

interface ProductPaymentBtnType {
    productList: ProductList[];
}


export interface ProductOrderType {
    orderPayId: string;
    productColorSizeId: number;
    req: string;
    quantity: number;
    amount: number;
    address: string;
    phoneNumber: string;
}

const ProductPaymentBtn = ({ productList }: ProductPaymentBtnType) => {
    const { user } = useRecoilValue(userState);
    const {req,address,phoneNumber} = useRecoilValue(orderInfoState);

    if (!user) return <></>
    const generateRandomId = () => {
        const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
        const array = new Uint8Array(length);
        window.crypto.getRandomValues(array);

        return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join("");
    };

    const onSuccess = (data: any) => {
        console.log("post 성공");
    }
    const { mutate } = useProductOrder({ onSuccess });
    
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
        address: address,
        phoneNumber: phoneNumber
    }));


    const handleClick = async () => {
        const tossPayments = await loadTossPayments("test_ck_Z1aOwX7K8m4b7av0xO6WryQxzvNP");
        console.log(productOrderList)
        const payment = tossPayments.payment({ customerKey: "a8s7d8asd" });

        await payment.requestPayment({
            method: "CARD",
            amount: {
                currency: "KRW",
                value: totalPrice
            },
            orderId: orderId,
            orderName: orderName,
            customerEmail: user.email,
            customerName: user.name,
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