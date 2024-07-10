'use client'

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductOrderBarRead } from "@/(FSD)/entities/product/api/useProductOrderBarRead";
import ProductOrderBar from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { useRecoilValue } from "recoil";
import { userState } from "@/(FSD)/shareds/stores/UserAtom";

 export interface orderInfoType {
    productColorId: number;
    productColorSizeId: number;
    color: string;
    size: string;
    stock: number;
}

export interface ProductOrderBarType {
    like?: boolean;
    likeIndex?: number;
    orderInfo: orderInfoType[]
    price: number;
}

const ProductOrderBarContainer = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductOrderBarRead(Number(productColorId));
    
    const orderBar: ProductOrderBarType = data || { orderInfo: [] };

    const orderInfo: orderInfoType[] = orderBar?.orderInfo || [];

    console.log(orderBar);
    console.log(orderInfo);
    
    useEffect(() => {
        refetch();
    }, [productColorId, orderBar, refetch]);

    console.log(orderBar.like)

   

    return (
        <ProductOrderBar orderBar={orderBar} parentRefetch={refetch}/>
    );
};

export default ProductOrderBarContainer;