"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductColorRead } from "../../../entities/product/api/useProductColorRead";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import ProductInfo from "@/(FSD)/widgets/product/ui/ProductInfo";
import ProductImagesSlideList from "@/(FSD)/widgets/product/ui/ProductImagesSlideList";
import { useSetRecoilState } from "recoil";
import { nameState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductOtherColorImageList from "./ProductOtherColorImageList";
import ReviewInfoList from "../../review/ui/ReviewInfoList";
import ProductDetailImage from "./ProductDetailImage";

const ProductInfoContainer = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductColorRead(+productColorId);

    const setName = useSetRecoilState(nameState)

    const productInfo: ProductInfoType = data;

    useEffect(() => {
        console.log(productInfo)
        refetch();
    }, [productColorId, data,refetch]);

    if (!productInfo) return <></>;

    setName(productInfo.name);

    return (
        <>
            <ProductImagesSlideList productImages={productInfo.productImages} />
            <ProductInfo product={productInfo} />

            {productInfo.booleanColor && (<ProductOtherColorImageList />)}
            
            <ProductDetailImage productColorId={productColorId} />

            <ReviewInfoList productColorId={productColorId} />
        </>
    );
};

export default ProductInfoContainer;
