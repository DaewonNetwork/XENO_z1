'use client'

import { useProductBySellerRead } from "@/(FSD)/entities/product/api/useProductBySellerRead";
import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
interface ProductColorCreateBtnType {
    productId: number;
    productNumber: string;
    productName: string;
}

const ProductColorCreateBtn = () => {
    const { data, isError, error, isPending } = useProductBySellerRead();
    const router = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const productInfoList: ProductColorCreateBtnType[] = data || [];

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleClick = (id: number) => {
        router.push(`/seller/product/create/${id}`);
    };



    return (
        <>

            <Button onPress={onOpen}>기존 상품에서 색상 추가</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">상품 목록</ModalHeader>
                            <ModalBody>
                                <div className="w-full max-w-[500px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                                    {productInfoList.length > 0 ? (
                                        <Listbox items={productInfoList} aria-label="Dynamic Actions">
                                            {(item) => (
                                                <ListboxItem key={item.productId} onClick={() => handleClick(item.productId)}>
                                                    품번 : {item.productNumber} 상품 이름 : {item.productName}
                                                </ListboxItem>
                                            )}
                                        </Listbox>
                                    ) : (
                                        <p>등록된 상품이 없습니다.</p>
                                    )}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    닫기
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
};

export default ProductColorCreateBtn;
