import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import OrderProductInfo from "./OrderProductInfo";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";

interface OrderCardProps {
    order: OrderInfoType;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const router = useRouter();

    const orderProductInfo: OrderProductInfoType = {
        productId: order.productId,
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
                <TextLargeShared>{order.orderDate} {order.status} </TextLargeShared>
                {order.status === "구매 확정" && (<Button size={"sm"} variant={"light"} onClick={() => !order.review
                    ? router.push(`/reviews/create/${order.orderId}`)
                    : router.push(`/reviews/info/${order.reviewId}`)}
                    radius="none">{!order.review ? (<TextSmallShared>리뷰 작성하기</TextSmallShared>) : (<TextSmallShared>리뷰 확인하기</TextSmallShared>)}</Button>)}

            </div>
            <div className={styles.card_body}>
                <OrderProductInfo product={orderProductInfo} />
            </div>
        </div>
    );
};

export default OrderCard;