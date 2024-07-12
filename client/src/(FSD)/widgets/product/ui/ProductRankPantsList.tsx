"use server";

import React from "react";
import ProductCardSlideList from "./ProductCardSlideList";
import { productRankList } from "../consts/productRankList";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import Link from "next/link";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";

const ProductRankPantsList = async () => {
    return (
        <div className={styles.product_rank_container}>
            <div className={styles.rank_box}>
                <TextLargeShared>하의 인기 순위</TextLargeShared>
                <Link href={"/"}><TextSmallShared>더보기</TextSmallShared></Link>
            </div>
            <ProductCardSlideList productList={productRankList} isRank={true} />
        </div>
    );
};

export default ProductRankPantsList;