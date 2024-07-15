"use server";

import React from "react";
import ProductCardSlideList from "./ProductCardSlideList";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import Link from "next/link";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { fetchServerData } from "@/(FSD)/shareds/fetch/fetchServerData";

const ProductRankOuterList = async () => {
    const productCardList: ProductType[] = await fetchServerData({path: "/product/rank/아우터" });

    if(!productCardList) return <></>;

    return (
        <div className={styles.product_rank_container}>
            <div className={styles.rank_box}>
                <TextLargeShared>아우터 인기 순위</TextLargeShared>
                <Link href={"/rank/outer"}><TextSmallShared>더보기</TextSmallShared></Link>
            </div>
            <ProductCardSlideList productList={productCardList} isRank={true} />
        </div>
    );
};

export default ProductRankOuterList;