"use client";

import React from "react";
import AppContainer from "../../app/ui/AppContainer";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import AppInner from "../../app/ui/AppInner";
import { useCartProductListRead } from "@/(FSD)/entities/cart/api/useCartProductListRead";
import { CartItemType } from "@/(FSD)/shareds/types/cart/CartItem.type";

const CartProductInfoList = () => {
    const { data, isLoading, error } = useCartProductListRead();

    const cartProductList: CartItemType = data;

    if(!cartProductList) return <></>;
    if(!cartProductList) return <></>;

    console.log(cartProductList);
    

    return (
        <div className={styles.cart_product_info_list}>
            <AppContainer>
                <AppInner>
                    a
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default CartProductInfoList;