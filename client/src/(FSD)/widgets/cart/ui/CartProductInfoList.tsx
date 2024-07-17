"use client";

import React from "react";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { useCartProductListRead } from "@/(FSD)/entities/cart/api/useCartProductListRead";
import { CartProductInfoType } from "@/(FSD)/shareds/types/cart/CartProductInfo.type";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import CartInfo from "@/(FSD)/features/cart/ui/CartInfo";

const CartProductInfoList = () => {
    const { data, isLoading, error } = useCartProductListRead();

    const cartProductList: CartProductInfoType[] = data;

    if (!cartProductList) return <></>;
    if (!cartProductList) return <></>;

    return (
        <div className={styles.cart_product_info_list}>
            <AppContainer>
                <AppInner>
                    {
                        cartProductList.map(product => (
                            <React.Fragment key={product.productsColorSizeId}>
                                <CartInfo product={product} />
                            </React.Fragment>
                        ))
                    }
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default CartProductInfoList;