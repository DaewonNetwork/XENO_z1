"use client"

import { useProductBySellerRead } from "@/(FSD)/entities/product/api/useProductBySellerRead";
import { useEffect, useReducer, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { IoContractSharp } from "react-icons/io5";
import { useTheme } from "next-themes";


const DarkModeSelectBtn = () => {
    
    const {theme,setTheme} = useTheme();

    return (

        <div style={{ marginBottom: "10px" }}>
            <Button isIconOnly onClick={() => {
                setTheme(theme == "dark" ? "light" : "dark");

            }} size="sm" variant="light"><IconShared iconType={theme == "dark" ? "sun" : "moon"} /></Button>
        </div>

    );
};

export default DarkModeSelectBtn;
