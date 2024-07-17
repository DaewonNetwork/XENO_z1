'use client'

import { useProductBySellerRead } from "@/(FSD)/entities/product/api/useProductBySellerRead";
import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import { useProductColorBySellerRead } from "@/(FSD)/entities/product/api/useProductColorBySellerRead";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";


interface ProductColorListType {
    productColorId: number;
    productNumber: string;
    productName: string;
    color: string;
}


interface UpdateProps {
    productInfoList: ProductColorListType[];
    handleUpdate: any
}

interface ReadProps {
    productInfoList: ProductColorListType[];
    handleRead: any
}

const ProductColorListBtn = () => {
    const { data, isError, error, isPending } = useProductColorBySellerRead();
    const router = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        console.log(data)
    }, [data]);

    const productInfoList: ProductColorListType[] = data || [];

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const mergedProductInfoList = mergeProductInfoList(productInfoList);


    // 품번(productNumber)을 기준으로 중복 항목을 합친 새로운 배열 생성하는 함수
    function mergeProductInfoList(productInfoList: ProductColorListType[]): ProductColorListType[] {
        const mergedMap = new Map<string, ProductColorListType>();

        // productInfoList를 순회하면서 품번을 기준으로 항목을 합침
        productInfoList.forEach(product => {
            const existingProduct = mergedMap.get(product.productNumber);

            if (existingProduct) {
                // 이미 품번이 존재하면 색상 정보를 추가함
                existingProduct.color += `, ${product.color}`; // 필요에 따라 수정 가능
            } else {
                // 품번이 존재하지 않으면 새 항목으로 추가함
                mergedMap.set(product.productNumber, { ...product });
            }
        });

        // Map을 배열로 변환하여 반환함
        const mergedList: ProductColorListType[] = Array.from(mergedMap.values());
        return mergedList;
    }

    const updateProductColorList = ({ productInfoList, handleUpdate }: UpdateProps) => {
        return (
            <Select
                label="추가 색상 상품 수정하기 "
                className="max-w-xs"
                size="lg"
            >
                {mergedProductInfoList.map(product => (
                    <SelectSection key={product.productNumber} showDivider title={product.productName}>
                        {productInfoList
                            .filter(item => item.productNumber === product.productNumber)
                            .map(item => (
                                <SelectItem key={item.productColorId} onClick={() => handleUpdate(item)}>
                                    {item.productName} ({item.color})
                                </SelectItem>
                            ))}
                    </SelectSection>
                ))}
            </Select>
        );
    };

    const readProductColorList = ({ productInfoList, handleRead }: ReadProps) => {
        return (
            <Select
                label="내가 등록한 상품으로 이동하기 "
                className="max-w-xs"
                size="lg"
            >
                {mergedProductInfoList.map(product => (
                    <SelectSection key={product.productNumber} showDivider title={product.productName}>
                        {productInfoList
                            .filter(item => item.productNumber === product.productNumber)
                            .map(item => (
                                <SelectItem key={item.productColorId} onClick={() => handleRead(item)}>
                                    {item.productName} ({item.color})
                                </SelectItem>
                            ))}
                    </SelectSection>
                ))}
            </Select>
        );
    };

    const handleUpdate = (product: ProductColorListType) => {
        router.push(`/seller/productColor/update/${product.productColorId}`);
    };

    const handleRead = (product: ProductColorListType) => {
        router.push(`/products/${product.productColorId}`);
    };


    return (
        <div style={{marginBottom:"10px"}}>
            <Button onClick={onOpen} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none"  
            endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}><TextMediumShared>추가된 색상 목록 보기</TextMediumShared></Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">상품 목록</ModalHeader>
                            <ModalBody>
                                {readProductColorList({ productInfoList, handleRead })}
                                {updateProductColorList({ productInfoList, handleUpdate })}

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

export default ProductColorListBtn;