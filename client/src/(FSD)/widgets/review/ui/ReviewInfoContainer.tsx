"use client"


import { useProductColorCardRead } from "@/(FSD)/entities/product/api/useProductColorCardRead";
import ProductCard from "@/(FSD)/entities/product/ui/ProductCard";
import { useReviewInfoRead } from "@/(FSD)/entities/review/api/useReviewInfoRead";
import ReviewInfo from "@/(FSD)/entities/review/ui/ReviewInfo";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";
import { ReviewInfoType } from "@/(FSD)/shareds/types/review/ReviewInfo.type";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";

const ReviewInfoContainer = () => {

    const router = useRouter();

    const { reviewId } = useParams<{ reviewId: string }>();

    const { data } = useReviewInfoRead(Number(reviewId));

    const reviewInfo: ReviewInfoType = data;

    const { data: productData, refetch } = useProductColorCardRead(reviewInfo?.productId);


    const product: ProductType | undefined = productData;

    useEffect(() => {
        console.log
    }, [product]);

    if (!reviewInfo) return <></>
    if (!product) return <></>


    return (
        <>
            <div className={styles.order_product_info}>
                <div className={styles.info_image}>
                    <img className="" src={`data:image/jpeg;base64,${product.productImage}`} onClick={() => router.push(`/products/${product.productId}`)} />
                </div>
                <div className={styles.info_text}>
                    <div className={styles.text_top}>
                        <TextSmallShared fontWeight={"semibold"}>{product.brandName}</TextSmallShared>
                        <TextSmallShared fontWeight={"semibold"}>{product.name} ({product.color})</TextSmallShared>
                    </div>
                    <div className={styles.text_btm}>
                        <TextMediumShared fontWeight={"semibold"}>{product.price.toLocaleString()}원</TextMediumShared>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: "50px" }} />
            <ReviewInfo review={reviewInfo} />
        </>
    );
};


export default ReviewInfoContainer;
