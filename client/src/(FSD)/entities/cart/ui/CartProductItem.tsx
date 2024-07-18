import { CartProductInfoType } from "@/(FSD)/shareds/types/cart/CartProductInfo.type";
import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";

interface CartProductItemProps {
    cart: CartProductInfoType;
    numberBar: ReactNode;
}

const CartProductItem = ({ numberBar, cart }: CartProductItemProps) => {
    return (
        <div className={styles.info_product}>
            <div className={styles.product_image}>
                <img src={`data:image/jpeg;base64,${cart.productImage}`} alt={""} />
            </div>
            <div className={styles.product_right}>
                <div className={styles.product_text}>
                    <TextSmallShared>{cart.brandName}</TextSmallShared>
                    <TextSmallShared fontWeight={"semibold"}>{cart.productName} ({cart.color})</TextSmallShared>
                    <TextMediumShared>{cart.amount.toLocaleString()}원</TextMediumShared>
                    <TextSmallShared className={"text-foreground-500"}>{cart.quantity.toLocaleString()}개 | {cart.size}</TextSmallShared>
                </div>
                {numberBar}
            </div>
        </div>
    );
};

export default CartProductItem;