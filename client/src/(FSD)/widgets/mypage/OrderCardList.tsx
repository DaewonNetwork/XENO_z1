"use client";

import { useOrderListRead } from "@/(FSD)/entities/orders/api/useOrderListRead";
import OrderCard from "@/(FSD)/entities/orders/ui/OrderCard";
import { useReviewCardListRead } from "@/(FSD)/entities/review/api/useReviewCardListRead";
import ReviewCard from "@/(FSD)/entities/review/ui/ReviewCard";
import styles from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import { ReviewCardType } from "@/(FSD)/shareds/types/review/ReviewCard.type";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const OrderCardList = () => {
    const { orderList, fetchNextPage, refetch, hasNextPage } = useOrderListRead();
    const { ref, inView } = useInView();

    useEffect(() => {
        refetch();
    }, [orderList]);


    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    const orderCardList: OrderInfoType[] = orderList;

    if (!orderCardList) return <></>;

    return (
        <div >
            {
                orderCardList.map(order => (
                    <React.Fragment key={order.orderId}>
                        <OrderCard order={order} />
                    </React.Fragment>
                ))
            }
            <div ref={ref} />
        </div>
    )
}

export default OrderCardList;