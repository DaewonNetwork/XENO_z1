"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { fetchAllReviewImages } from '@/(FSD)/entities/product/api/useProductReviewListRead';
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import { useQuery } from '@tanstack/react-query';
import ProductReviewCard from '@/(FSD)/entities/product/ui/ProductReviewCard';
import { ReviewType } from '@/(FSD)/shareds/types/Review.type';

const ReviewsPage = () => {
    const [selectedReview, setSelectedReview] = useState<ReviewType | null>(null);
    const { data: reviewImages, isLoading, isError } = useQuery({
        queryKey: ['reviewImages'],
        queryFn: fetchAllReviewImages
    });

    if (isLoading) return <div>리뷰 로딩 중...</div>;
    if (isError) return <div>리뷰를 불러오는 데 실패했습니다.</div>;
    if (!reviewImages || reviewImages.length === 0) return <div>리뷰가 없습니다.</div>;

    const handleImageClick = async (reviewId: number) => {
        try {
            console.log(`Fetching review details for reviewId: ${reviewId}`);
            const response = await fetch(`http://localhost:8090/reviews/${reviewId}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`리뷰 상세 정보를 불러오는데 실패했습니다. 상태 코드: ${response.status}, 에러 메시지: ${errorText}`);
            }
            const reviewDetails = await response.json();
            console.log('Review details:', reviewDetails);
            if (reviewDetails === null || Object.keys(reviewDetails).length === 0) {
                console.error('리뷰 상세 정보가 비어있습니다.');
            } else {
                setSelectedReview(reviewDetails);
            }
        } catch (error) {
            console.error('리뷰 상세 정보를 불러오는 중 오류 발생:', error);
        }
    };

    return (
        <AppSection>
            <div className="grid grid-cols-3 gap-4">
                {reviewImages.map((review: { reviewId: number, image: string }, index: number) => (
                    <div key={index} className="aspect-square relative overflow-hidden cursor-pointer" onClick={() => handleImageClick(review.reviewId)}>
                        <Image
                            src={`data:image/jpeg;base64,${review.image}`}
                            alt={`리뷰 이미지 ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
            {selectedReview && (
                <ProductReviewCard review={selectedReview} onClose={() => setSelectedReview(null)} />
            )}
        </AppSection>
    );
};

export default ReviewsPage;