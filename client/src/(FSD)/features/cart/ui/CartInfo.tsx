import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import { CartProductInfoType } from "@/(FSD)/shareds/types/cart/CartProductInfo.type";
import CartProductItem from "@/(FSD)/entities/cart/ui/CartProductItem";
import CartProductNumberBar from "./CartProductNumberBar";
import CartProductDeleteBtn from "./CartProductDeleteBtn";
import CartProductSelectBtn from "./CartProductSelectBtn";

interface CartInfoProps {
    product: CartProductInfoType;
}

const CartInfo = ({ product }: CartInfoProps) => {
    console.log(product);

    return (
        <div className={styles.cart_product_info}>
            <div className={styles.left_box}>
                <CartProductSelectBtn />
                <CartProductItem product={product} numberBar={<CartProductNumberBar cartId={product.cartId} defaultQuantity={product.quantity} />} />
            </div>
            <CartProductDeleteBtn />
        </div>
    );
};

export default CartInfo;