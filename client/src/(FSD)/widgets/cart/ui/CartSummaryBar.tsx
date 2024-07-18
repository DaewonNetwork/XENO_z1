"use client";

import React, { useEffect } from "react";
import { useCartSummary } from "@/(FSD)/entities/cart/api/useCartSummary";
import { CartSummaryType } from "@/(FSD)/shareds/types/cart/CartSummary.type";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { cartSummaryRefetchState, cartSummaryState } from "@/(FSD)/shareds/stores/CartSummaryAtome";
import { useSetRecoilState } from "recoil";

const CartSummaryBar = () => {
    const { data, refetch } = useCartSummary();

    const cartSummary: CartSummaryType = data;
    
    const setCartSummary = useSetRecoilState(cartSummaryState);

    const setCartSummaryRefetch = useSetRecoilState(cartSummaryRefetchState);

 
    if(!data) return<></>
    if(!cartSummary) return <></>;

    setCartSummaryRefetch({ refetch })

    setCartSummary(cartSummary.totalPrice)

    return (
        <div className={styles.cart_summary_bar}>
            <AppContainer>
                <AppInner>
                    <TextMediumShared fontWeight={"semibold"}>총 {cartSummary.totalProductIndex.toLocaleString()}개 {cartSummary.totalPrice.toLocaleString()}원</TextMediumShared>
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default CartSummaryBar;