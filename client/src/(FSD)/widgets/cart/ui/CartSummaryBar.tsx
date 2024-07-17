"use client";

import { useCartSummary } from "@/(FSD)/entities/cart/api/useCartSummary";
import React from "react";

const CartSummaryBar = () => {
    const { data } = useCartSummary();
    console.log(data);

    return (
        <div>

        </div>
    )
}

export default CartSummaryBar;