import React from "react";
import { useRouter } from "next/navigation";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

interface OrderCardProps {
    order: OrderInfoType;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const router = useRouter();

    console.log(order);
    

    return (
        <div className={styles.order_card}>
            <div className={styles.card_header}>
                <TextLargeShared>{order.amount.toLocaleString()}원</TextLargeShared>
                <Button size={"sm"} variant={"light"} isIconOnly><IconShared iconType={"right"} /></Button>
            </div>
            <div className={styles.card_body}>

            </div>
        </div>
    );
};

export default OrderCard;