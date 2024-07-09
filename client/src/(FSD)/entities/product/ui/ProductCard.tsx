import React, { ReactNode } from "react";
import type { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { Skeleton } from "@nextui-org/skeleton";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

interface ProductCardType {
    product: ProductType;
    linkBtn: ReactNode;
    isRank?: boolean;
    rank?: number;
    isError?: boolean;
    isLoading?: boolean;
}



const ProductCard = ({ product, linkBtn, isRank = false, rank = 0 , isError, isLoading }: ProductCardType) => {

    const handleImageClick = () => {
        // 이미지 클릭 시 처리할 작업
        window.location.href = `products/${product.productColorId}`;
    };

    const calculateDiscountPercent = (price: number, priceSale: number): number => {
        return Math.round(((price - priceSale) / price) * 100);
    };

    const discountPercent = calculateDiscountPercent(product.price, product.priceSale);

    return (
        <div className={styles.product_card}>
            <div className={styles.card_top}>
                {isRank && <div className={`bg-content2 ${styles.product_rank}`}>{rank}</div>}
                {!product.productImage ?
                    (<Skeleton className={styles.product_skeleton} />)
                    : (<img
                        src={`data:image/jpeg;base64,${product.productImage}`}
                        className={styles.product_image}
                        onClick={handleImageClick}
                    />)}
                {linkBtn && <div className={styles.product_like_btn}>{linkBtn}</div>}
            </div>
            <div className={styles.card_btm}>
                <p className={"font-medium"}>{product.brandName}</p>
                <p><a href={`/products/${product.productColorId}`}>{product.name}</a></p>
                <p className="font-medium">
                    {product.sale && (
                        <span className="text-primary">
                            {`${discountPercent}% `}
                        </span>
                    )}
                    {product.sale ? product.priceSale.toLocaleString() : product.price.toLocaleString()}원
                </p>
            </div>
        </div>
    )
}

export default ProductCard;