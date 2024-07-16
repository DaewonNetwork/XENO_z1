import React from "react";

import styles from "@/(FSD)/shareds/styles/SkeletonStyle.module.scss";
import { Skeleton } from "@nextui-org/skeleton";
import ItemShared from "./ItemShared";

const ProductCardSkeletonShared = () => {
    return (
        <div className={styles.product}>
            <Skeleton className={`rounded-small ${styles.product_img}`} />
            <Skeleton className={`rounded-small ${styles.product_brand}`} />
            <Skeleton className={`rounded-small ${styles.product_name}`} />
            <div style={{ display: "flex", flexDirection: "row" }}>
            <Skeleton className={`rounded-small ${styles.product_sale}`} />
            <Skeleton className={`rounded-small ${styles.product_price}`} />
            </div>
        </div>
    )
}

export default ProductCardSkeletonShared;