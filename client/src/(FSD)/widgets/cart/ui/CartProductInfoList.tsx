"use client";

import React, { useEffect, useState } from "react";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { useCartProductListRead } from "@/(FSD)/entities/cart/api/useCartProductListRead";
import { CartProductInfoType } from "@/(FSD)/shareds/types/cart/CartProductInfo.type";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import CartInfo from "@/(FSD)/features/cart/ui/CartInfo";
import { useSetRecoilState } from "recoil";
import { cartProductInfoListRefetchState } from "@/(FSD)/shareds/stores/CartUpdateAtom";
import { cartState } from "@/(FSD)/shareds/stores/CartAtom";

const CartProductInfoList = () => {


    const { data, isLoading, error, refetch } = useCartProductListRead();

    const cartProductList: CartProductInfoType[] = data;

    const setCartProductInfoListRefetch = useSetRecoilState(cartProductInfoListRefetchState);

    const setCart = useSetRecoilState(cartState);

    setCartProductInfoListRefetch({ refetch });


    if (!cartProductList) return <></>;
    if (!cartProductList[0]) return <></>;

        
    setCart(cartProductList);

    return (
        <div className={styles.cart_product_info_list}>
            <AppContainer>
                <AppInner>
                    {
                        cartProductList.map((cart) => (
                            <React.Fragment key={cart.productsColorSizeId}>
                                <CartInfo cart={cart}  />
                            </React.Fragment>
                        ))
                    }
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default CartProductInfoList;