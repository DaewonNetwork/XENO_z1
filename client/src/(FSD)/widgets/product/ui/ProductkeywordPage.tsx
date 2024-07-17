"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useProductkeywordSearch } from "@/(FSD)/entities/product/api/useProductkeywordSearch";
import ProductCardList from "@/(FSD)/widgets/product/ui/ProductCardList";
import ProductCardSkeletonShared from "@/(FSD)/shareds/ui/ProductCardSkeletonShared";

const ProductKeywordPage = () => {
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

    if (isError) return <></>;
    if (!productList) return <></>;
    if (!productList[0]) return <></>;    

    return (
        <>
            <ProductCardList productList={productList} parentRefetch={refetch} lastCard={
                <>
                    {isFetchingNextPage ? (
                        <ProductCardSkeletonShared />
                    ) : (
                        <div ref={ref} />
                    )}
                </>
            } />
        </>
    );
};

export default ProductKeywordPage;