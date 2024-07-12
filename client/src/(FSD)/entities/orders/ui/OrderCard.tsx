import { ReviewCardType } from "@/(FSD)/shareds/types/review/ReviewCard.type";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";
import { Skeleton } from "@nextui-org/skeleton";
import { useRouter } from "next/navigation";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";

interface OrderCardProps {
    order: OrderInfoType;

}

const OrderCard = ({ order }: OrderCardProps) => {
    if(!order) return <></>
    const router = useRouter();

    const redirectToOrderDetailInfo = () => {
        router.push(`/mypage/orders/detail${order.orderId}`)
    }

    return (
       <div>
        {order.orderDate}
        {order.status}
        {order.brandName}
        {order.productName}
        {order.color}
        {order.size}
        {order.quantity}
        {order.amount}
        <img
                    src={`data:image/jpeg;base64,${order.productImage}`}
        />
        <button onClick={redirectToOrderDetailInfo}> </button>

        
        
        </div>
    );
};

export default OrderCard;