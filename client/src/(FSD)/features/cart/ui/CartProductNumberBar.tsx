"use client";

import React, { useState } from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { Input } from "@nextui-org/input";
import { useCartUpdate } from "../api/useCartUpdate";

interface CartProductNumberBarProps {
    defaultQuantity: number;
    cartId: number;
}

interface HandleClickType {
    type: "plus" | "minus";
}

const CartProductNumberBar = ({ defaultQuantity, cartId }: CartProductNumberBarProps) => {
    const [quantity, setQuantity] = useState(defaultQuantity);

    const onSuccess = (data: any) => {
        console.log(data);
        
    };

    const { mutate } = useCartUpdate({ onSuccess });

    const handleClick = ({ type } : HandleClickType) => {
        if (type === "plus") {
            setQuantity(state => ++state);
        } else {
            setQuantity(state => --state);
        }

        console.log(quantity);
        

        mutate({ cartId: cartId, quantity: quantity });
    };

    return (
        <div className={styles.cart_product_number_bar}>
            <Button onClick={_ => {
                handleClick({ type: "plus" });
            }} className={"bg-foreground-200"} radius={"none"} isIconOnly size={"sm"}><IconShared iconType={"plus"} /></Button>
            <div className={styles.input_box}>
                <Input type={"number"} size={"sm"} radius={"none"} fullWidth value={`${quantity}`} />
            </div>
            <Button onClick={_ => {
                handleClick({ type: "minus" });
            }} className={"bg-foreground-200"} radius={"none"} isIconOnly size={"sm"}><IconShared iconType={"minus"} /></Button>
        </div>
    );
};

export default CartProductNumberBar;