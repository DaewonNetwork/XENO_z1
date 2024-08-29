"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { useRouter } from "next/navigation";

interface OrderProductInfoProps {
    product: OrderProductInfoType;
};

const OrderProductInfo = ({ product }: OrderProductInfoProps) => {
    const router = useRouter();
    
    return (
        <div 
        onClick={_ => {
            router.push(`/products/${product.productId}`);
        }}
        className={styles.order_product_info}
        >
            <div className={styles.info_image}>
                <img src={`data:image/jpeg;base64,${product.image}`} onClick={()=>  router.push(`/products/${product.productId}`)} style={{cursor: "pointer"}} />
            </div>
            <div className={styles.info_text}>
                <div className={styles.text_top}>
                    <TextSmallShared fontWeight={"semibold"}>{product.name} ({product.color})</TextSmallShared>
                    <TextSmallShared className={"text-foreground-500"}>수량 {product.quantity.toLocaleString()}개</TextSmallShared>
                    <TextSmallShared className={"text-foreground-500"}>사이즈 {product.size}</TextSmallShared>
                </div>
                <div className={styles.text_btm}>
                    <TextMediumShared fontWeight={"semibold"}>{product.price.toLocaleString()}원</TextMediumShared>
                </div>
            </div>
        </div>
    );
};

export default OrderProductInfo;