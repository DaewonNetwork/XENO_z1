"use client"

import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import React, { useEffect } from "react";
import { categoryIdState, categorySubIdState } from "@/(FSD)/shareds/stores/CategoryAtom";

import { useRecoilValue } from "recoil";
import ProductCardSkeletonShared from "@/(FSD)/shareds/ui/ProductCardSkeletonShared";

import ProductCardList from "./ProductCardList";
import { useProductListByCategoryRead } from "@/(FSD)/entities/product/api/useProductListByCategoryRead";



const ProductCategoryList = ( ) => {
  
    const categoryId = useRecoilValue(categoryIdState);
    const categorySubId = useRecoilValue(categorySubIdState);

    const { data, isLoading, refetch } = useProductListByCategoryRead(categoryId, categorySubId);

    const productList: ProductType[] = data;

    useEffect(() => {
        refetch();console.log(data)

    }, [productList, refetch]);

    

    if (isLoading) {
        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} style={{ flex: "0 0 calc(25% - 10px)", marginRight: index % 2 === 0 ? "15px" : "0", marginBottom: "10px" }}>
                        <ProductCardSkeletonShared />
                    </div>
                ))}
            </div>
        );
    }
    

    // 데이터가 없는 경우 빈 화면을 반환
    if (!productList || productList.length === 0) return <></>;
   

    return (
        <ProductCardList column={2} productList={productList} parentRefetch={refetch} isColor={true} />
    );
};

export default ProductCategoryList;