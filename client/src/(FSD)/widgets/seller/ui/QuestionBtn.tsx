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

const QuestionBtn = () => {
   

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

   


    return (
        <div style={{marginBottom:"10px"}}>
            <Button onClick={onOpen} size={"sm"}   className="w-full h-[100px] bg-white border-2" radius="none"  endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}><TextMediumShared>
                자주 찾는 질문</TextMediumShared></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">자주 찾는 질문</ModalHeader>
                            <ModalBody>
                                
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

export default QuestionBtn;
