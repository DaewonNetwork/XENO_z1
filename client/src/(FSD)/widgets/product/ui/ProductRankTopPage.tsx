"use client";

import { useProductRankTopPage } from "@/(FSD)/entities/product/api/useProductRankTopPage";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductCardList from "./ProductCardList";

const ProductRankTopPage = () => {
    const { productCardList, fetchNextPage, refetch, isFetchingNextPage, isPending, isError } = useProductRankTopPage();

    const { ref, inView } = useInView();

    useEffect(() => {
        refetch();
    }, [productCardList]);

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    if (isError) return <></>;
    if (!productCardList) return <></>;



    return (
        <ProductCardList productList={productCardList} parentRefetch={refetch} lastCard={<div ref={ref} />} />
    );
};

export default ProductRankTopPage;