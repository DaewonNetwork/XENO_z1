import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { Button } from "@nextui-org/button";
import React from "react";

const CartProductDeleteBtn = () => {
    return (
        <Button isIconOnly size={"sm"} variant={"light"}><IconShared iconType={"close"} /></Button>
    );
};

export default CartProductDeleteBtn;