'use client'

import { useProductCardRead } from "@/(FSD)/entities/product/api/useProductCardRead";
import ProductCard from "@/(FSD)/entities/product/ui/ProductCard";
import { useReviewInfoRead } from "@/(FSD)/entities/review/api/useReviewInfoRead";
import ReviewInfo from "@/(FSD)/entities/review/ui/ReviewInfo";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { ReviewInfoType } from "@/(FSD)/shareds/types/review/ReviewInfo.type";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";


const ReviewInfoContainer = () => {
    const { reviewId} = useParams<{ reviewId: string }>();
    
    const { data } = useReviewInfoRead(Number(reviewId));

    const reviewInfo:ReviewInfoType = data;
    
    const { data:product,refetch } = useProductCardRead(reviewInfo?.productColorId);

    useEffect(() => {
        console.log(product);
        
    }, [product]);

    if(!reviewInfo) return <></>
    if(!product) return <></>


    return (
        <>
            <ProductCard product={product}  likeBtn={<ProductLikeBtn productColorId={product.productColorId} isLike={product.like} parentRefetch={refetch} />} />
            <ReviewInfo review={reviewInfo} />
        </>
    );
};


export default ReviewInfoContainer;
