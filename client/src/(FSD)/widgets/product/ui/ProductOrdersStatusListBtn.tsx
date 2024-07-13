'use client'

import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useOrderListBySellerRead } from "@/(FSD)/entities/orders/api/useOrderListBySellerRead";
import { Select, SelectItem } from "@nextui-org/select";

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

const statuses = [
    "결제 완료",
    "출고 처리",
    "배송 중",
    "배송 완료",
    "구매 확정",
    "환불 신청",
    "환불 완료"
];

const ProductOrdersStatusListBtn = () => {
    const { data, isError, error, isPending } = useOrderListBySellerRead();
    const { isOpen: isOrderModalOpen, onOpen: onOpenOrderModal, onOpenChange: onOpenChangeOrderModal } = useDisclosure();
    const { isOpen: isStatusModalOpen, onOpen: onOpenStatusModal, onOpenChange: onOpenChangeStatusModal } = useDisclosure();

    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedOrder, setSelectedOrder] = useState<ProductOrdersStatusListBtnType | null>(null);
    const [showStatusOptions, setShowStatusOptions] = useState<boolean>(false);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const orderInfoList: ProductOrdersStatusListBtnType[] = data || [];

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleClick = (order: ProductOrdersStatusListBtnType) => {
        setSelectedOrder(order);
        setSelectedStatus(order.status);
        onOpenStatusModal();
    };

    const handleSave = () => {
        console.log(`Order ID: ${selectedOrder?.orderID}, New Status: ${selectedStatus}`);
        onOpenChangeStatusModal();
        setShowStatusOptions(false); // 상태 업데이트 후 옵션 숨기기
    };

    const availableStatuses = statuses.filter(status => status !== selectedStatus);

    return (
        <>
            <Button onClick={onOpenOrderModal}>주문 내역 보기</Button>

            {/* 주문 내역 모달 */}
            <Modal isOpen={isOrderModalOpen} onOpenChange={onOpenChangeOrderModal}>
                <ModalContent>
                    <ModalHeader>주문 내역</ModalHeader>
                    <ModalBody>
                        {orderInfoList.map(order => (
                            <div key={order.orderID}>
                                <Button onClick={() => handleClick(order)}>
                                    {order.orderNumber} - {order.productName} - {order.customerName} - {order.status}
                                </Button>
                            </div>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onOpenChangeOrderModal} color="secondary">닫기</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* 상태 업데이트 모달 */}
            <Modal isOpen={isStatusModalOpen} onOpenChange={onOpenChangeStatusModal}>
                <ModalContent>
                    <ModalHeader>주문 상태 업데이트</ModalHeader>
                    <ModalBody>
                        <p>주문 번호: {selectedOrder?.orderNumber}</p>
                        <p>제품 이름: {selectedOrder?.productName}</p>
                        <p>고객 이름: {selectedOrder?.customerName}</p>
                        <p>수량: {selectedOrder?.quantity}</p>
                        <p>색상: {selectedOrder?.color}</p>
                        <p>사이즈: {selectedOrder?.size}</p>
                        <p>
                            현재 상태:
                            <span
                                onClick={() => setShowStatusOptions(!showStatusOptions)}
                                style={{
                                    cursor: 'pointer',

                                    display: 'inline-block',
                                    padding: '4px 8px',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                {selectedStatus}
                            </span>
                        </p>

                        {showStatusOptions && (
                            <Select
                                label={selectedStatus}
                            > 
                             {availableStatuses.map((status, index) => (
                                <SelectItem key={index} onClick={() => setSelectedStatus(status)}>
                                    {status}
                                </SelectItem>
                            ))}</Select>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSave}>저장</Button>
                        <Button onClick={onOpenChangeStatusModal} color="secondary">취소</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProductOrdersStatusListBtn;
