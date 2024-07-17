import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import { CartProductInfoType } from "@/(FSD)/shareds/types/cart/CartProductInfo.type";
import CartProductItem from "@/(FSD)/entities/cart/ui/CartProductItem";
import CartProductQuantityBar from "./CartProductQuantityBar";
import CartProductDeleteBtn from "./CartProductDeleteBtn";
import CartProductSelectBtn from "./CartProductSelectBtn";

interface CartInfoProps {
    cart: CartProductInfoType;
}

const CartInfo = ({ cart }: CartInfoProps) => {
    return (
        <div className={styles.cart_product_info}>
            <div className={styles.left_box}>
                <CartProductSelectBtn />
                <CartProductItem cart={cart} numberBar={<CartProductQuantityBar cartId={cart.cartId} defaultQuantity={cart.quantity} />} />
            </div>
            <CartProductDeleteBtn cartId={cart.cartId} />
        </div>
    );
};

export default CartInfo;