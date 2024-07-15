"use client";

import { useProductRankTopPage } from "@/(FSD)/entities/product/api/useProductRankTopPage";
import ProductCard from "@/(FSD)/entities/product/ui/ProductCard";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";
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

    console.log(productCardList);

    if (isError) return <></>;
    if (!productCardList) return <></>;



    return (
        <ProductCardList productList={productCardList} parentRefetch={refetch} lastCard={<div ref={ref} />} />
    );
};

export default ProductRankTopPage;