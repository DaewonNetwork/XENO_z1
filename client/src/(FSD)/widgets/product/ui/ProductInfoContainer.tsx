'use client'

import React, { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { useProductColorRead} from "../../../entities/product/api/useProductColorRead";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import ProductInfo from "@/(FSD)/widgets/product/ui/ProductInfo";
import ProductImagesSlideList from "@/(FSD)/widgets/product/ui/ProductImagesSlideList";
import RelatedColorProducts from "./ProductOtherColorImageList";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {nameState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductDetailImageList from "./ProductDetailImageList";
import ProductOtherColorImageList from "./ProductOtherColorImageList";
import ReviewCardList from "../../review/ui/ReviewCardList";
import ReviewInfoList from "../../review/ui/ReviewInfoList";

const ProductInfoContainer = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductColorRead(Number(productColorId));


   

    const setName = useSetRecoilState(nameState)
    
    const product:ProductInfoType = data || []

    setName(product.name);


    useEffect(() => {
        refetch();
    }, [productColorId, refetch]);

    if (isError) {
       
        return <div>에러가 발생했습니다.</div>;
    }

    if (isPending || !product) {
  
        return <div>Loading...</div>;
    }

    if(!data) notFound();



    return (
        <>
            <ProductImagesSlideList productImages={product.productImages} />
            <ProductInfo product={product} />
            {product.booleanColor && (<ProductOtherColorImageList/>)}
            <ProductDetailImageList productColorId={productColorId} />
            <ReviewInfoList productColorId={productColorId}/>
            
        </>
    );
};


export default ProductInfoContainer;
