import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import OrderProductInfo from "./OrderProductInfo";

interface OrderCardProps {
    order: OrderInfoType;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const router = useRouter();
    const orderProductInfo: OrderProductInfoType = {
        productColorId: order.productColorId,
        color: order.color,
        size: order.size,
        quantity: order.quantity,
        price: order.amount,
        name: order.productName,
        image: order.productImage
    };



    return (
        <div className={styles.order_card}>
            <div className={styles.card_header}>
                <TextLargeShared>{order.orderDate}</TextLargeShared>
                <Button size={"sm"} variant={"light"} isIconOnly><IconShared iconType={"right"} /></Button>
            </div>
            <div className={styles.card_body}>
                <OrderProductInfo product={orderProductInfo} />
            </div>
        </div>
    );
};

export default OrderCard;