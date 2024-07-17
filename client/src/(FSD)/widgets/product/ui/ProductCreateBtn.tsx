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


const ProductCreateBtn = () => {

    const router = useRouter();

    return (

        <div style={{ marginBottom: "10px" }}>

            <Button onClick={() => router.push('/seller/product/create')} size={"sm"}
                className="w-full h-[100px] bg-white border-2" radius="none"
            ><TextMediumShared>상품 등록하기</TextMediumShared></Button>

        </div>

    );
};

export default ProductCreateBtn;
