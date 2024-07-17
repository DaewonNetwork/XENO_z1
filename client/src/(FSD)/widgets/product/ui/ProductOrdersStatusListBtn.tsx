"use client"

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useOrderListSellerRead } from "@/(FSD)/entities/order/api/useOrderListSellerRead";
import { Select, SelectItem } from "@nextui-org/select";
import { useOrderStatusUpdate } from "@/(FSD)/features/order/api/useOrderStatusUpdate";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";

interface ProductOrdersStatusListBtnType {
    orderID: number;
    orderNumber: number;
    quantity: number;
    productName: string;
    color: string;
    size: string;
    status: string;
    amount: number;
    req: string;
    orderDate: string;
    customerName: string; // 변경된 필드
}

interface SelectSectionProps {
    title: string;
    orders: ProductOrdersStatusListBtnType[];
    handleClick: (order: ProductOrdersStatusListBtnType) => void;
}

export interface OrderStatusChangeType {
    orderId: number;
    status: string;
}

const statuses = [
    { key: "결제 완료", status: "결제 완료" },
    { key: "출고 처리", status: "출고 처리" },
    { key: "배송 중", status: "배송 중" },
    { key: "배송 완료", status: "배송 완료" },
    { key: "구매 확정", status: "구매 확정" },
    { key: "환불 신청", status: "환불 신청" },
    { key: "환불 완료", status: "환불 완료" },
];

const ProductOrdersStatusListBtn = () => {
    const { data, isError, error, isPending, refetch } = useOrderListSellerRead();
    const onSuccess = (data: any) => {
        refetch();
        onCloseStatusModal();
        onOpenUpdateCompleteModal();

    }

    const { mutate } = useOrderStatusUpdate({ onSuccess });
    const { isOpen: isOrderModalOpen, onOpen: onOpenOrderModal, onOpenChange: onOpenChangeOrderModal, onClose: onCloseOrderModal } = useDisclosure();
    const { isOpen: isStatusModalOpen, onOpen: onOpenStatusModal, onOpenChange: onOpenChangeStatusModal, onClose: onCloseStatusModal } = useDisclosure();
    const { isOpen: isUpdateCompleteModalOpen, onOpen: onOpenUpdateCompleteModal, onOpenChange: onOpenChangeUpdateCompleteModal, onClose: onCloseUpdateCompleteModal } = useDisclosure();


    const [selectedOrder, setSelectedOrder] = useState<ProductOrdersStatusListBtnType | null>(null);
    const [status, setStatus] = useState<OrderStatusChangeType>({ orderId: 0, status: "" });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const orderInfoList: ProductOrdersStatusListBtnType[] = data || [];

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;



    // const statusCompleted: ProductOrdersStatusListBtnType[] = orderInfoList.filter(order => order.status === "결제 완료");
    // const statusShipping: ProductOrdersStatusListBtnType[] = orderInfoList.filter(order => order.status === "출고 처리");
    // const statusShippingInProgress: ProductOrdersStatusListBtnType[] = orderInfoList.filter(order => order.status === "배송 중");
    // const statusDelivered: ProductOrdersStatusListBtnType[] = orderInfoList.filter(order => order.status === "배송 완료");
    // const statusConfirmed: ProductOrdersStatusListBtnType[] = orderInfoList.filter(order => order.status === "구매 확정");
    // const statusRefundRequested: ProductOrdersStatusListBtnType[] = orderInfoList.filter(order => order.status === "환불 신청");
    // const statusRefunded: ProductOrdersStatusListBtnType[] = orderInfoList.filter(order => order.status === "환불 완료");



    const renderSelectItems = ({ title, orders, handleClick }: SelectSectionProps) => {
        if (orders.length === 0) {
            return (
                <Select
                    label={title}
                    className="max-w-xs"
                    size="lg"
                    disabledKeys={["주문내역 없음"]}
                >
                    <SelectItem key={"주문내역 없음"}>
                        <div>주문내역 없음</div>
                    </SelectItem>
                </Select>
            );
        } else {
            return (
                <Select
                    label={title}
                    className="max-w-xs"
                    size="lg"
                >
                    {orders.map(order => (
                        <SelectItem key={order.orderID} onClick={() => handleClick(order)}>
                            <div>{order.orderNumber} - {order.productName}</div>
                            <div>{order.customerName}</div>
                        </SelectItem>
                    ))}
                </Select>
            );
        }
    };


    const handleClick = (order: ProductOrdersStatusListBtnType) => {
        setSelectedOrder(order);
        setStatus({ orderId: order.orderID, status: order.status });
        onCloseOrderModal();
        onOpenStatusModal();
    };

    const handleSave = () => {
        console.log(status)
        mutate(status)
    };

    return (
        <div style={{marginBottom:"10px"}}>

            <Button onClick={onOpenOrderModal} size={"sm"} 
             className="w-full h-[100px] bg-white border-2" radius="none" 
             endContent={<IconShared iconType={isOrderModalOpen ? "top" : "bottom"} />}><TextMediumShared>주문 내역 보기</TextMediumShared></Button>


            {/* 주문 내역 모달 */}
            <Modal isOpen={isOrderModalOpen} onOpenChange={onOpenChangeOrderModal}>
                <ModalContent>
                    <ModalHeader>주문 내역</ModalHeader>
                    <ModalBody>
                        {statuses.map((statusItem) => (
                            <React.Fragment key={statusItem.key}>
                                {renderSelectItems({ title: statusItem.key, orders: orderInfoList.filter(order => order.status === statusItem.status), handleClick })}
                            </React.Fragment>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onCloseOrderModal} color="secondary">닫기</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* 상태 업데이트 모달 */}
            <Modal isOpen={isStatusModalOpen} onOpenChange={onOpenStatusModal}  >
                <ModalContent>
                    <ModalHeader>주문 상세 정보</ModalHeader>
                    <ModalBody>
                        <p>주문 번호: {selectedOrder?.orderNumber}</p>
                        <p>제품 이름: {selectedOrder?.productName}</p>
                        <p>고객 이름: {selectedOrder?.customerName}</p>
                        <p>수량: {selectedOrder?.quantity}</p>
                        <p>색상: {selectedOrder?.color}</p>
                        <p>사이즈: {selectedOrder?.size}</p>
                        <p>요청 사항: {selectedOrder?.req}</p>
                        <Select
                            label="주문 상태 선택"
                            placeholder={status.status}
                            className="max-w-xs"
                            value={status.status}
                            disabledKeys={[status.status]}
                            onChange={(e) => setStatus({ ...status, status: e.target.value })}
                        >
                            {statuses.map((item) => (
                                <SelectItem key={item.key} value={item.status}>
                                    {item.status}
                                </SelectItem>
                            ))}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button isDisabled={status.status === selectedOrder?.status} onClick={handleSave}>저장</Button>
                        <Button onClick={() => { onCloseStatusModal(); onOpenOrderModal(); }}>닫기</Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isUpdateCompleteModalOpen} onOpenChange={onOpenChangeUpdateCompleteModal}  >
                <ModalContent>
                    <ModalHeader>주문 상태 변경 완료</ModalHeader>
                    <ModalBody>
                        주문 상태를 변경했습니다.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => { onCloseUpdateCompleteModal(); onOpenStatusModal(); }}>확인하기</Button>
                        <Button onClick={onCloseUpdateCompleteModal}>닫기</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ProductOrdersStatusListBtn;
