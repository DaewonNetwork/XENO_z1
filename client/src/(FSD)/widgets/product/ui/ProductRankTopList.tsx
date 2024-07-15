"use server";

import React from "react";
import ProductCardSlideList from "./ProductCardSlideList";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import Link from "next/link";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { fetchServerData } from "@/(FSD)/shareds/fetch/fetchServerData" ;
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { productRankList } from "../consts/productRankList";

const ProductRankTopList = async () => { 
    const productCardList: ProductType[] = await fetchServerData({path: "/product/rank/상의", isLoggedIn: true });
    
    if(!productCardList) return <></>;

    return (
        <div className={styles.product_rank_container}>
            <div className={styles.rank_box}>
                <TextLargeShared>상의 인기 순위</TextLargeShared>
                <Link href={"/"}><TextSmallShared>더보기</TextSmallShared></Link>
            </div>
            <ProductCardSlideList productList={productRankList} isRank={true} />
        </div>
    )
}

export default ProductRankTopList;