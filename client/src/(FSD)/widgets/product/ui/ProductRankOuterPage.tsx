"use client";

import { useProductRankOuterPage } from "@/(FSD)/entities/product/api/useProductRankOuterPage";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductCardList from "./ProductCardList";

const ProductRankOuterPage = () => {
    const { productCardList, fetchNextPage, refetch, isFetchingNextPage, isPending, isError } = useProductRankOuterPage();

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

export default ProductRankOuterPage;