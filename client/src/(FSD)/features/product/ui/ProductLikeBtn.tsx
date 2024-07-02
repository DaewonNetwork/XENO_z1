import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { Button } from "@nextui-org/button";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

interface ProductLikeBtnType {
    productId: number;
    isLike?: boolean;
}

const ProductLikeBtn = ({ productId, isLike = true } : ProductLikeBtnType) => {
    return (
        <>
            <Button className={`${styles.like_btn} ${isLike && styles.active}`} variant={"light"} size={"sm"} isIconOnly endContent={<IconShared iconType={"like"} iconSize={"sm"} />} />
        </>
    )
}

export default ProductLikeBtn;