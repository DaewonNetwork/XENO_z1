'use client'

import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import AppInner from "../../app/ui/AppInner";
import OrderPaymentBtn from "@/(FSD)/features/order/ui/OrderPaymentBtn";
import { Button } from "@nextui-org/button";
import { useRecoilValue } from "recoil";
import { cartSummaryState } from "@/(FSD)/shareds/stores/CartSummaryAtome";
import { useRouter } from "next/navigation";
import { cartState } from "@/(FSD)/shareds/stores/CartAtom";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";

const CartBtnBar = () => {

    const router = useRouter();

    const cartSummary = useRecoilValue(cartSummaryState);

    const cart = useRecoilValue(cartState);

    
    const convertCartToCartItem = (cart: any[]): OrderProductInfoType[] => {
        return cart.map(item => ({
            productColorSizeId: item.productsColorSizeId,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
            price: item.amount,
            name: item.productName,
            image: item.productImage
        }));
    };

    const handleClick = () => {

        console.log(cart)
        localStorage.setItem("newProducts", JSON.stringify(convertCartToCartItem(cart)));
        router.push("/order");
            }

    return (
        <div className={styles.cart_btn_bar}>
            <AppInner>
            <Button size={"lg"} onClick={handleClick} fullWidth color={"primary"}>{cartSummary.toLocaleString()}원 구매하기 이동</Button>
            </AppInner>
        </div>
    );
};

export default CartBtnBar;