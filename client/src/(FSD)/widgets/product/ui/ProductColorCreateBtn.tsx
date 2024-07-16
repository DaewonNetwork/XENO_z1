"use client"

import { useProductBySellerRead } from "@/(FSD)/entities/product/api/useProductBySellerRead";
import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
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

                                {productInfoList.length > 0 ? (
                                    <Select label="기존 상품 목록" >
                                        {productInfoList.map(product => (
                                            <SelectItem key={product.productId} onClick={() => handleClick(product.productId)}>
                                                품번 : {product.productNumber} 상품 이름 : {product.productName}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <p>등록된 상품이 없습니다.</p>
                                )}

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
