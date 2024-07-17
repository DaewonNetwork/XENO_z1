"use server";

import React from "react";
import AppInner from "../../app/ui/AppInner";
import ProductRankTopList from "./ProductRankTopList";
import ProductRankPantsList from "./ProductRankPantsList";
import ProductRankOuterList from "./ProductRankOuterList";
import styles from "@/(FSD)/shareds/styles/MainStyle.module.scss";

const ProductRankContainer = async () => {
    return (
        <div className={styles.content}>
            <AppInner>
                <ProductRankTopList />
                <ProductRankPantsList />
                <ProductRankOuterList />
            </AppInner>
        </div>
    );
};

export default ProductRankContainer;