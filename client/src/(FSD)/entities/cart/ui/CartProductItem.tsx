import { CartProductInfoType } from "@/(FSD)/shareds/types/cart/CartProductInfo.type";
import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";

interface CartProductItemProps {
    product: CartProductInfoType;
    numberBar: ReactNode;
}

const CartProductItem = ({ numberBar, product }: CartProductItemProps) => {
    console.log(product);

    return (
        <div className={styles.info_product}>
            <div className={styles.product_image}>
                <img src="" alt="" />
            </div>
            <div className={styles.product_right}>
                <div className={styles.product_text}>
                    <TextSmallShared>{product.brandName}</TextSmallShared>
                    <TextSmallShared fontWeight={"semibold"}>{product.productName} ({product.color})</TextSmallShared>
                    <TextMediumShared>{product.amount.toLocaleString()}원</TextMediumShared>
                    <TextSmallShared className={"text-foreground-500"}>{product.quantity.toLocaleString()}개 | {product.size}</TextSmallShared>
                </div>
                {numberBar}
            </div>
        </div>
    );
};

export default CartProductItem;