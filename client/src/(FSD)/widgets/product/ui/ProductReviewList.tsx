"use client";

import ProductReviewCard from '@/(FSD)/entities/product/ui/ProductReviewCard';
import { ReviewType } from '@/(FSD)/shareds/types/Review.type';
import React from 'react'
import Image from 'next/image';

const ProductReviewList = ({ reviews }: { reviews: ReviewType[] }) => {
    if (!reviews || reviews.length === 0) return <div>아직 리뷰가 없습니다.</div>;

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {reviews.map((review: ReviewType, index: number) => (
                    <Image 
                        key={index}
                        src={`data:image/jpeg;base64,${review.reviewDetailImages[0]}`}
                        alt={`리뷰 이미지 ${index + 1}`}
                        width={100}
                        height={100}
                    />
                ))}
            </div>
            {reviews.map((review: ReviewType) => (
                <React.Fragment key={review.reviewId}>
                    <ProductReviewCard review={review} />
                </React.Fragment>
            ))}
        </div>
    )
}

export default ProductReviewList