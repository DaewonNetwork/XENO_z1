import React from "react";
import ProductCardList from "./ProductCardList";
import { productRankList } from "../consts/productRankList";
import { useProductListByLikedRead } from "@/(FSD)/entities/product/api/useProductListByLikedRead";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";

const ProductLikeList = () => {

const {data} = useProductListByLikedRead();

const productList: ProductType[] = data;

    return (
        <ProductCardList productList={productList} />
    );
};

export default ProductLikeList;