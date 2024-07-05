'use client'

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductRead } from "../api/useProductRead";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import ProductInfo from "@/(FSD)/widgets/product/ui/ProductInfo";
import ProductImagesSlideList from "@/(FSD)/widgets/product/ui/ProductImagesSlideList";
import RelatedColorProducts from "./RelatedColorProducts";
import ProductDetailImages from "./ProductDetailImages";

const ProductInfoContainer = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductRead(Number(productColorId));



    const product:ProductInfoType = data || []

    

    useEffect(() => {
        refetch();
    }, [productColorId, refetch]);

    if (isError) {
        // 예외 처리 로직 추가
        return <div>에러가 발생했습니다.</div>;
    }

    if (isPending || !product) {
        // 로딩 중이거나 데이터가 없을 때 로딩 스피너 또는 빈 화면 표시
        return <div>Loading...</div>;
    }

   

    console.log(product)


    return (
        <>
            <ProductImagesSlideList productImages={product.productImages} />
            <ProductInfo product={product} />
            <RelatedColorProducts/>
            <ProductDetailImages productColorId={productColorId} />
        </>
    );
};


export default ProductInfoContainer;
