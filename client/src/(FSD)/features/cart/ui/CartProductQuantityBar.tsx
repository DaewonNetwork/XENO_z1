"use client";

import React, { Ref, useRef, useState } from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { Input } from "@nextui-org/input";
import { useCartUpdate } from "../api/useCartUpdate";
import { useRecoilValue } from "recoil";
import { cartProductInfoListRefetchState, cartProductQuantityState } from "@/(FSD)/shareds/stores/CartUpdateAtom";

interface CartProductQuantityBarProps {
    defaultQuantity: number;
    cartId: number;
}

interface HandleClickType {
    type: "plus" | "minus";
}

const CartProductQuantityBar = ({ defaultQuantity, cartId }: CartProductQuantityBarProps) => {
    const [quantity, setQuantity] = useState(defaultQuantity);

    const { refetch } = useRecoilValue(cartProductInfoListRefetchState);

    const onSuccess = (data: any) => {
        refetch();
    };

    const { mutate } = useCartUpdate({ onSuccess });

    const handleClick = ({ type }: HandleClickType) => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;

        setQuantity(newQuantity);
        mutate({ cartId, quantity: newQuantity });
    };

    return (
        <div className={styles.cart_product_number_bar}>
            <Button onClick={_ => {
                handleClick({ type: "plus" });
            }} className={"bg-foreground-200"} radius={"none"} isIconOnly size={"sm"}><IconShared iconType={"plus"} /></Button>
            <div className={styles.input_box}>
                <Input value={`${quantity}`} type={"number"} size={"sm"} radius={"none"} fullWidth />
            </div>
            <Button onClick={_ => {
                handleClick({ type: "minus" });
            }} className={"bg-foreground-200"} radius={"none"} isIconOnly size={"sm"}><IconShared iconType={"minus"} /></Button>
        </div>
    );
};

export default CartProductQuantityBar;