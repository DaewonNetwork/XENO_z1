import React from "react";
import ProductCardList from "./ProductCardList";
import { productRankList } from "../consts/productRankList";

const ProductLikeList = () => {
    return (
        <ProductCardList productList={productRankList} />
    );
};

export default ProductLikeList;