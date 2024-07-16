"use client";

import { useOrderListRead } from "@/(FSD)/entities/orders/api/useOrderListRead";
import OrderCard from "@/(FSD)/entities/orders/ui/OrderCard";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";

const OrderCardList = () => {
    const { orderList, fetchNextPage, refetch, hasNextPage } = useOrderListRead();
    const { ref, inView } = useInView();

    useEffect(() => {
        refetch();
        console.log(orderList)
    }, [orderList]);

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    const orderCardList: OrderInfoType[] = orderList;

    if (!orderCardList) return <></>;

    return (
        <div className={styles.order_list}>
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