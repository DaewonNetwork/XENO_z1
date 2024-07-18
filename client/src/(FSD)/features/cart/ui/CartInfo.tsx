import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import { CartProductInfoType } from "@/(FSD)/shareds/types/cart/CartProductInfo.type";
import CartProductItem from "@/(FSD)/entities/cart/ui/CartProductItem";
import CartProductQuantityBar from "./CartProductQuantityBar";
import CartProductDeleteBtn from "./CartProductDeleteBtn";

interface CartInfoProps {
    cart: CartProductInfoType;
}

const CartInfo = ({ cart }: CartInfoProps) => {
    console.log(cart)
    return (
        <div className={styles.cart_product_info}>
            <div className={styles.left_box}>
                <CartProductItem cart={cart} numberBar={<CartProductQuantityBar cartId={cart.cartId} defaultQuantity={cart.quantity} price={cart.price} />} />
            </div>
            <CartProductDeleteBtn cartId={cart.cartId} />
        </div>
    );
};

export default CartInfo;