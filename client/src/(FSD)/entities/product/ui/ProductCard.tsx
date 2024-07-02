import React, { ReactNode } from "react";
import type { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { Skeleton } from "@nextui-org/skeleton";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

interface ProductCardType {
    product: ProductType;
    linkBtn: ReactNode;
    isRank?: boolean;
    rank?: number;
}

const ProductCard = ({ product, linkBtn, isRank = false, rank = 0 }: ProductCardType) => {
    return (
        <div className={styles.product_card}>
            <div className={styles.card_top}>
                {isRank && <div className={`bg-content2 ${styles.product_rank}`}>{rank}</div>}
                {!product.productImage && <Skeleton className={styles.product_skeleton} />}
                {linkBtn && <div className={styles.product_like_btn}>{linkBtn}</div>}
            </div>
            <div className={styles.card_btm}>
                <p className={"font-medium"}>{product.productBrand}</p>
                <p>{product.productName}</p>
                <p className={"font-medium"}><span className={"text-primary"}>{product.isLike && `${product.sale}%`}</span> {product.price}원</p>
            </div>
        </div>
    )
}

export default ProductCard;