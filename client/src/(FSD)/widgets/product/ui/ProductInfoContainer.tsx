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
import { useProductRead } from "@/(FSD)/entities/product/api/useProductRankRead";

const ProductInfoContainer = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data, isError, error, isPending, refetch } = useProductRead(+productId);

    const setName = useSetRecoilState(nameState)

    const productInfo: ProductInfoType = data;

    useEffect(() => {
        console.log(productInfo)
        refetch();
    }, [productId, data,refetch]);

    if (!productInfo) return <></>;

    console.log(productInfo)

    setName(productInfo.name);
    
    const urls = [productInfo.url_1, productInfo.url_2, productInfo.url_3, productInfo.url_4, productInfo.url_5, productInfo.url_6];

    return (
        <>
            <ProductImagesSlideList productImages={urls} />
            <ProductInfo product={productInfo} />
            <ProductDetailImage url={productInfo.detail_url} />

            {/* <ReviewInfoList productId={productId} /> */}
        </>
    );
};

export default ProductInfoContainer;
