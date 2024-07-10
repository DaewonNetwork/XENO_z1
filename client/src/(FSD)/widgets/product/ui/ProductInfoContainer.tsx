'use client'

import React, { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { useProductRead } from "../../../entities/product/api/useProductRead";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import ProductInfo from "@/(FSD)/widgets/product/ui/ProductInfo";
import ProductImagesSlideList from "@/(FSD)/widgets/product/ui/ProductImagesSlideList";
import RelatedColorProducts from "./ProductOtherColorImageList";

import { useSetRecoilState } from "recoil";
import { nameState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductDetailImageList from "./ProductDetailImageList";
import ProductOtherColorImageList from "./ProductOtherColorImageList";

const ProductInfoContainer = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductRead(Number(productColorId));


   

    const setName = useSetRecoilState(nameState)
    
    const product:ProductInfoType = data || []

    setName(product.name);

    

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

    if(!data) notFound();

    

    console.log(product)


    return (
        <>
            <ProductImagesSlideList productImages={product.productImages} />
            <ProductInfo product={product} />
            <ProductOtherColorImageList/>
            <ProductDetailImageList productColorId={productColorId} />
        </>
    );
};


export default ProductInfoContainer;
