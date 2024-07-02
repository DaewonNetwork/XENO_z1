import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { Button } from "@nextui-org/button";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";

interface ProductLikeBtnType {
    productId: number;
    isLike?: boolean;
    isIndex?: boolean;
    index?: number;
    size?: "lg" | "md" | "sm"
}

const ProductLikeBtn = ({ productId, isLike = true, size = "sm", isIndex = false, index }: ProductLikeBtnType) => {
    return (
        <>
            <Button className={`${styles.like_btn} ${isIndex ? styles.index_btn : ""} ${isLike && styles.active}`} variant={"light"} size={size} isIconOnly={!isIndex}>
                <IconShared iconType={"like_active"} iconSize={"sm"} />
                <TextSmallShared>{index}</TextSmallShared>
            </Button>
        </>
    )
}

export default ProductLikeBtn;