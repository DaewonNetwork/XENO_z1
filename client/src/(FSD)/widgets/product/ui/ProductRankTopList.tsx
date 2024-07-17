"use server";

import React, { useEffect } from "react";
import ProductCardSlideList from "./ProductCardSlideList";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import Link from "next/link";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { fetchServerData } from "@/(FSD)/shareds/fetch/fetchServerData" ;
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";

const ProductRankTopList = async () => { 
    const productCardList: ProductType[] = await fetchServerData({path: "/product/rank/상의" });
    
    if(!productCardList) return <></>;

    console.log(productCardList)
    

    return (
        <div className={styles.product_rank_container}>
            <div className={styles.rank_box}>
                <TextLargeShared>상의 인기 순위</TextLargeShared>
                <Link href={"/rank/top"}><TextSmallShared>더보기</TextSmallShared></Link>
            </div>
            <ProductCardSlideList productList={productCardList} isRank={true} />
        </div>
    )
}

export default ProductRankTopList;