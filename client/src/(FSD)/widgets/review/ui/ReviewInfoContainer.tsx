'use client'


import { useProductColorCardRead } from "@/(FSD)/entities/product/api/useProductColorCardRead";
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
    
    const { data:product,refetch } = useProductColorCardRead(reviewInfo?.productColorId);

    useEffect(() => {
       
    }, [product]);

    if(!reviewInfo) return <></>
    if(!product) return <></>


    return (
        <div >
            <ProductCard product={product}  likeBtn={<ProductLikeBtn productColorId={product.productColorId} isLike={product.like} parentRefetch={refetch} />} />
            <ReviewInfo review={reviewInfo} />
        </div>
    );
};


export default ReviewInfoContainer;
