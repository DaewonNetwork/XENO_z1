import IconShared from "@/(FSD)/shareds/ui/IconShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import React from "react";

interface ProductCartType {
    
}

const ProductCart = ({} : ProductCartType) => {
    return (
        <LinkBtnShared href={"/cart"} size={"sm"} isIconOnly endContent={<IconShared iconSize={"md"} iconType={"cart"} />} />
    );
};

export default ProductCart;