'use client'

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import ProductOrderBar from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { useRecoilValue } from "recoil";
import { useProductColorOrderBarRead } from "@/(FSD)/entities/product/api/useProductColorOrderBarRead";


 export interface ProductOrderInfoType {
    productColorId: number;
    productColorSizeId: number;
    color: string;
    size: string;
    stock: number;
}

export interface ProductOrderBarType {
    like?: boolean;
    likeIndex?: number;
    orderInfo: ProductOrderInfoType[]
    price: number;
}

const ProductOrderBarContainer = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductColorOrderBarRead(Number(productColorId));
    
    const orderBar: ProductOrderBarType = data || { orderInfo: [] };

    


    useEffect(() => {
        console.log(orderBar);
        refetch();
    }, [productColorId, orderBar, refetch]);

    if(!data && !orderBar) return <></>


   
    return (
        <ProductOrderBar orderBar={orderBar} parentRefetch={refetch}/>
    );
};

export default ProductOrderBarContainer;