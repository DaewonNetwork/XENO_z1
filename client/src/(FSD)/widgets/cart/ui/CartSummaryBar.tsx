"use client";

import React from "react";
import { useCartSummary } from "@/(FSD)/entities/cart/api/useCartSummary";
import { CartSummaryType } from "@/(FSD)/shareds/types/cart/CartSummary.type";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { cartSummaryRefetchState } from "@/(FSD)/shareds/stores/CartSummaryAtome";
import { useSetRecoilState } from "recoil";

const CartSummaryBar = () => {
    const { data, refetch } = useCartSummary();

    const cartSummary: CartSummaryType = data;

    const setCartSummaryRefetch = useSetRecoilState(cartSummaryRefetchState);

    setCartSummaryRefetch({ refetch });

    if(!cartSummary) return <></>;

    return (
        <div className={styles.cart_summary_bar}>
            <AppContainer>
                <AppInner>
                    <TextMediumShared fontWeight={"semibold"}>{cartSummary.totalProductIndex.toLocaleString()}개</TextMediumShared>
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default CartSummaryBar;