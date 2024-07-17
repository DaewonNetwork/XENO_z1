"use client"

import React from "react";
import ProductCardList from "./ProductCardList";
import { productRankList } from "../consts/productRankList";
import { useProductListByLikedRead } from "@/(FSD)/entities/product/api/useProductListByLikedRead";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";

const ProductLikeList = () => {

const {data,refetch} = useProductListByLikedRead();

const productList: ProductType[] = data;

if(!productList ) return <></>

    return (
        <ProductCardList productList={productList} parentRefetch={refetch} isColor={true} />
    );
};

export default ProductLikeList;