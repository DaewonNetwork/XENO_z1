"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import ProductOrderBar from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { useProductColorOrderBarRead } from "@/(FSD)/entities/product/api/useProductColorOrderBarRead";


 export interface OrderProductInfoType {
    productId: number;
    productColorSizeId: number;
    color: string;
    size: string;
    stock: number;
}

export interface ProductOrderBarType {
    like?: boolean;
    likeIndex?: number;
    orderInfo: OrderProductInfoType[]
    price: number;
}

const ProductOrderBarContainer = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data, isError, error, isPending, refetch } = useProductColorOrderBarRead(Number(productId));
    
    const orderBar: ProductOrderBarType = data || { orderInfo: [] };

    


    useEffect(() => {
        console.log(orderBar);
        refetch();
    }, [productId, orderBar, refetch]);

    if(!data && !orderBar) return <></>


   
    return (
        <ProductOrderBar orderBar={orderBar} parentRefetch={refetch}/>
    );
};

export default ProductOrderBarContainer;