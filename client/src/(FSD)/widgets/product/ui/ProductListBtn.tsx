"use client"

import { useProductBySellerRead } from "@/(FSD)/entities/product/api/useProductBySellerRead";
import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
interface ProductColorCreateBtnType {
    productId: number;
    productNumber: string;
    productName: string;
}

const ProductListBtn = () => {
    const { data, isError, error, isPending } = useProductBySellerRead();
    const router = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {

    }, [data]);

    const productInfoList: ProductColorCreateBtnType[] = data || [];

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleCreate = (productId: number) => {
        router.push(`/seller/product/create/${productId}`);
    };

    const handleUpdate = (productId: number) => {
        router.push(`/seller/product/update/${productId}`);
    };



    return (
        <div style={{marginBottom:"10px"}}>
            <Button onClick={onOpen} size={"sm"}   className="w-full h-[100px] bg-white border-2" radius="none" 
             endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}><TextMediumShared>기존 상품 목록 보기</TextMediumShared></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">상품 목록</ModalHeader>
                            <ModalBody>
                                {productInfoList.length > 0 ? (
                                    <Select label="기존 상품에서 색상 추가하기" >
                                        {productInfoList.map(product => (
                                            <SelectItem key={product.productId} onClick={() => handleCreate(product.productId)}>
                                                품번 : {product.productNumber} 상품 이름 : {product.productName}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <p>등록된 상품이 없습니다.</p>
                                )}

                                {productInfoList.length > 0 ? (
                                    <Select label="기존 상품 정보 수정하기" >
                                        {productInfoList.map(product => (
                                            <SelectItem key={product.productId} onClick={() => handleUpdate(product.productId)}>
                                                품번 : {product.productNumber} 상품 이름 : {product.productName}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                ) : (
                                    ""
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

        </div>
    );
};

export default ProductListBtn;
