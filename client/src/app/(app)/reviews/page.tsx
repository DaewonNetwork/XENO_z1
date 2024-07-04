"use client";

import React from 'react';
import Image from 'next/image';
import { useProductReviewListRead } from '@/(FSD)/entities/product/api/useProductReviewListRead';
import { ReviewType } from '@/(FSD)/shareds/types/Review.type';
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";

const ReviewsPage = () => {
    const { data: reviews, isLoading, isError } = useProductReviewListRead();

    if (isLoading) return <div>리뷰 로딩 중...</div>;
    if (isError) return <div>리뷰를 불러오는 데 실패했습니다.</div>;

    return (
        <AppSection>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {reviews.map((review: ReviewType) => (
                    review.reviewDetailImages.map((image: Uint8Array, index: number) => (
                        <div key={`${review.reviewId}-${index}`} className="relative w-full pt-[100%]">
                            <Image
                                src={`data:image/jpeg;base64,${Buffer.from(image).toString('base64')}`}
                                alt={`리뷰 이미지 ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                    ))
                ))}
            </div>
        </AppSection>
    );
};

export default ReviewsPage;