"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useProductkeywordSearch } from "@/(FSD)/entities/product/api/useProductkeywordSearch";
import ProductCardList from "@/(FSD)/widgets/product/ui/ProductCardList";
import ProductCardSkeletonShared from "@/(FSD)/shareds/ui/ProductCardSkeletonShared";

const ProductkeywordPage = () => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("keyword")!;

    const { productList, fetchNextPage, refetch, isFetchingNextPage, isError } = useProductkeywordSearch(keyword);

    const { ref, inView } = useInView();
    
    useEffect(() => {
        refetch();
    }, [productList]);
    
    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);


    console.log(productList);

    if (isError) return <></>;
    if (!productList) return <></>;

    return (
        <>
            {
                productList.map(product => (
                    <React.Fragment key={product.productColorId}>
                        <ProductCardList productList={productList} parentRefetch={refetch} />
                    </React.Fragment>
                    
                ))
            }
            {
                isFetchingNextPage ? <>
                    <ProductCardSkeletonShared />
                    {
                        Array.from({ length: 9 }).map((_, index) => (
                            <React.Fragment key={index}>
                                <ProductCardSkeletonShared />
                            </React.Fragment>
                        ))
                    }
                </> : <div ref={ref} />
            }
        </>
    );
};

export default ProductkeywordPage;