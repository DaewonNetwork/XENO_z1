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


const OrderInfoListBtn = () => {
    
    const router = useRouter();


    return (
        <div style={{marginBottom:"10px"}}>
            <Button onClick={() =>   router.push(`/mypage/orders`)} size={"sm"}   className="w-full h-[100px] bg-white border-2" radius="none" >주문 내역 확인하기</Button>
            
        </div>
    );
};

export default OrderInfoListBtn;
