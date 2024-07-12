'use client'

import { ReviewCardType } from "@/(FSD)/shareds/types/review/ReviewCard.type";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";
import { Skeleton } from "@nextui-org/skeleton";
import { useParams, useRouter } from "next/navigation";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import { useOrderDetailInfoRead } from "../api/useOrderDetailInfoRead";


const OrderDetailInfo = () => {
    const { orderId } = useParams<{ orderId: string }>();

    const {data} = useOrderDetailInfoRead(Number(orderId));

    const router = useRouter();

    return (
       <div>

        
        </div>
    );
};

export default OrderDetailInfo;