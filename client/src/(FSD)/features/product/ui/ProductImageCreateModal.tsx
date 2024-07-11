"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

interface ProductImageCreateModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductImageCreateModal = ({ setIsOpen }: ProductImageCreateModalProps) => {
    return (
        <div className={`bg-background ${styles.product_image_create_modal}`}>
            <AppTitleHeader title={"이미지 등록하기"} left={<Button onClick={_ => {
                setIsOpen(false);
            }} variant={"light"} isIconOnly size={"sm"}><IconShared iconType={"close"} /></Button>} />
        </div>
    )
}

export default ProductImageCreateModal;