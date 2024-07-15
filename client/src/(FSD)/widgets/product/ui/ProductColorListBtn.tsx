'use client'

import { useProductBySellerRead } from "@/(FSD)/entities/product/api/useProductBySellerRead";
import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { useProductColorBySellerRead } from "@/(FSD)/entities/product/api/useProductColorBySellerRead";
interface ProductColorListType {
    productColorId: number;
    productNumber: string;
    productName: string;
    color: string;
}

const ProductColorListBtn = () => {
    const { data, isError, error, isPending } = useProductColorBySellerRead();
    const router = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const productInfoList: ProductColorListType[] = data || [];

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleCreate = (id: number) => {
        router.push(`/seller/product/create/${id}`);
    };

    const handleUpdate = (id: number) => {
        router.push(`/seller/product/update/${id}`);
    };



    return (
        <>

            <Button onPress={onOpen}>추가된 색상 목록 보기</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">상품 목록</ModalHeader>
                            <ModalBody>

                                {productInfoList.length > 0 ? (
                                    <Select label="기존 상품에서 색상 추가하기" >
                                        {productInfoList.map(product => (
                                            <SelectItem key={product.productColorId} onClick={() => handleCreate(product.productColorId)}>
                                                품번 : {product.productNumber} 상품 이름 : {product.productName}
                                                색상: {product.color}
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

export default ProductColorListBtn;
