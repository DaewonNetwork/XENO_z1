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
        </div>
    );
};

export default ProductListBtn;
