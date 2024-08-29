import React, { ReactNode } from "react";
import type { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { Skeleton } from "@nextui-org/skeleton";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { useRouter } from "next/navigation";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import Link from "next/link";

interface ProductCardType {
    product: ProductType;
    likeBtn: ReactNode;
    isRank?: boolean;
    rank?: number;
    isColor?: boolean;
}

const ProductCard = ({ product, likeBtn, isRank = false, rank = 0 , isColor = false}: ProductCardType) => {

    const router = useRouter();

    const calculateDiscountPercent = (price: number, priceSale: number): number => {
        return Math.round(((price - priceSale) / price) * 100);
    };

    const discountPercent = calculateDiscountPercent(product.price, product.priceSale);

    return (
        <div 
        className={styles.product_card}
        onClick={_ => {
            router.push(`/products/${product.productId}`);
        }}
        >
            <div className={styles.card_top}>
                {isRank && <div className={`bg-content2 ${styles.product_rank}`}><TextSmallShared>{rank}</TextSmallShared></div>}
                {!product.productImage && <Skeleton className={styles.product_skeleton} />}
                {product.productImage &&
                    <img
                        src={`data:image/jpeg;base64,${product.productImage}`}
                        className={styles.product_image}
                    />}
                {likeBtn && <div className={styles.product_like_btn}>{likeBtn}</div>}
            </div>
            <div className={styles.card_btm}>
                <TextSmallShared fontWeight={"medium"}>{product.brandName}</TextSmallShared>
                <TextSmallShared>{product.name} {isColor &&`(${product.color})`} </TextSmallShared>
                <TextSmallShared>
                    {product.sale && (
                        <span className="text-primary">
                            {`${discountPercent}% `}
                        </span>
                    )}
                    {product.sale ? product.priceSale.toLocaleString() : product.price.toLocaleString()}원
                </TextSmallShared>
            </div>
        </div>
    )
}

export default ProductCard;