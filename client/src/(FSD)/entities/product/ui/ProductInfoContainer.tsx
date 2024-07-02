"use client";


import { notFound, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useProductRead } from "../api/useProductRead";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import ProductImagesSlideList from "@/(FSD)/widgets/product/ui/ProductImagesSlideList";
import { productImages } from "../consts/productImages";
import ProductInfo from "@/(FSD)/widgets/product/ui/ProductInfo";


const ProductInfoContainer = () => {
    // const { productId } = useParams<{ productId: string }>();
    // const { data, isError, error, isPending, refetch } = useProductRead(Number(productId));

    // const product: ProductInfoType = data;

    // useEffect(() => {
    //     refetch();
    // }, [productId]);

    // // console.log("id"+productId)
    // // console.log("data:"+data)
    // // console.log(product)
    // // console.log(useProductRead)
    // // if(isError) notFound();
    // // if(isPending) return <Loading />;

    // if (!product) return <></>;

    return (

        <>
            <ProductImagesSlideList productImages={productImages} />
            <ProductInfo />
        </>
    );
};

export default ProductInfoContainer;