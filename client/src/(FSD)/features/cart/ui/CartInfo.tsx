import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import { CartProductInfoType } from "@/(FSD)/shareds/types/cart/CartProductInfo.type";
import CartProductItem from "@/(FSD)/entities/cart/ui/CartProductItem";

interface CartInfoProps {
    product: CartProductInfoType;
    selectBtn?: ReactNode;
    deleteBtn?: ReactNode;
}

const CartInfo = ({ product, selectBtn, deleteBtn }: CartInfoProps) => {
    console.log(product);

    return (
        <div className={styles.cart_product_info}>
            <div className={styles.left_box}>
                {selectBtn}
                <CartProductItem product={product} />
            </div>
            {deleteBtn}
        </div>
    );
};

export default CartInfo;