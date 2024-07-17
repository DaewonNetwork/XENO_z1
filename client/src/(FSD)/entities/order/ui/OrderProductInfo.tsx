import React from "react";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";

interface OrderProductInfoProps {
    product: OrderProductInfoType;
};

const OrderProductInfo = ({ product }: OrderProductInfoProps) => {
    return (
        <div className={styles.order_product_info}>
            <div className={styles.info_image}>
                <img src={`data:image/jpeg;base64,${product.image}`} />
            </div>
            <div className={styles.info_text}>
                <div className={styles.text_top}>
                    <TextSmallShared fontWeight={"semibold"}>{product.name} ({product.color})</TextSmallShared>
                    <TextSmallShared className={"text-foreground"}>수량 {product.quantity.toLocaleString()}개</TextSmallShared>
                    <TextSmallShared className={"text-foreground"}>사이즈 {product.size}</TextSmallShared>
                </div>
                <div className={styles.text_btm}>
                    <TextMediumShared fontWeight={"semibold"}>{product.price.toLocaleString()}원</TextMediumShared>
                </div>
            </div>
        </div>
    );
};

export default OrderProductInfo;