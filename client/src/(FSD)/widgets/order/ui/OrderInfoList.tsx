"use client";

import { useOrderListRead } from "@/(FSD)/entities/order/api/useOrderListRead";
import OrderCard from "@/(FSD)/entities/order/ui/OrderCard";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";

const OrderInfoList = () => {
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

    const orderInfoList: OrderInfoType[] = orderList;

    if (!orderInfoList) return <></>;
    if(!orderInfoList[0]) return <></>;
    

    return (
        <div className={styles.order_info_list}>
            {
                orderInfoList.map(order => (
                    <React.Fragment key={order.orderId}>
                        <OrderCard order={order} />
                    </React.Fragment>
                ))
            }
            <div ref={ref} />
        </div>
    )
}

export default OrderInfoList;