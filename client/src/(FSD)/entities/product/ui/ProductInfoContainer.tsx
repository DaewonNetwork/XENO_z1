"use client";


import { notFound, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useProductRead } from "../api/useProductRead";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import ProductImagesSlideList from "@/(FSD)/widgets/product/ui/ProductImagesSlideList";

import ProductInfo from "@/(FSD)/widgets/product/ui/ProductInfo";
import ProductDetailImages from "./ProductDetailImages";
import RelatedColorProducts from "./RelatedColorProducts";



const ProductInfoContainer = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductRead(Number(productColorId));

    const product: ProductInfoType = data;

    useEffect(() => {
        refetch();
    }, [productColorId]);

    // console.log("id"+productId)
   

    // console.log(useProductRead)
    // if(isError) notFound();
    // if(isPending) return <Loading />;

    if (!product) return <></>;
    
    console.log(product)
    console.log(product.sale)

    return (

        <>
            <ProductImagesSlideList productImages={product.productImages} />
            <ProductInfo product={product} />
            {/* {product.booleanColor && <RelatedColorProducts productId={productId} />} */}
            <ProductDetailImages productColorId={productColorId}/>
        </>
    );
};

export default ProductInfoContainer;