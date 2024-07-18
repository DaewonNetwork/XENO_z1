"use client";

import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { Button } from "@nextui-org/button";
import React from "react";
import { useCartListDelete } from "../api/useCartDelete";
import { cartProductInfoListRefetchState } from "@/(FSD)/shareds/stores/CartUpdateAtom";
import { useRecoilValue } from "recoil";
import { cartSummaryRefetchState } from "@/(FSD)/shareds/stores/CartSummaryAtome";

interface CartProductDeleteBtnProps {
    cartId: number;
}

const CartProductDeleteBtn = ({ cartId }: CartProductDeleteBtnProps) => {
    const { refetch: cartProductInfoListRefetch } = useRecoilValue(cartProductInfoListRefetchState);
    const { refetch: cartSummaryRefetch } = useRecoilValue(cartSummaryRefetchState);

    const onSuccess = (data: any) => {
        cartProductInfoListRefetch();
        cartSummaryRefetch();
    };

    const { mutate } = useCartListDelete({ onSuccess });

    return (
        <Button
            onClick={_ => mutate(cartId)}
            isIconOnly size={"sm"} variant={"light"}><IconShared iconType={"close"} /></Button>
    );
};

export default CartProductDeleteBtn;