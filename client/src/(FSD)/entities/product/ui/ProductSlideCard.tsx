import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { Skeleton } from "@nextui-org/skeleton"
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";

const ProductSlideCard = ({ product }: { product: ProductType }) => {
    return (
        <div className={styles.product_item}>
            <div className={styles.img_item}>
                {product.productImage ? "" : <Skeleton />}
            </div>
            <div className={styles.text_item}>
                <p className={`font-semibold ${styles.product_brand}`}>{product.productBrand}</p>
                <span className={styles.product_name}>{product.productName}</span>
                <p className={`font-semibold ${styles.product_price}`}>{product.isSale && <span className={"text-primary"}>{product.sale}%</span>}{product.price.toLocaleString()}원</p>
            </div>
        </div>
    );
};

export default ProductSlideCard;