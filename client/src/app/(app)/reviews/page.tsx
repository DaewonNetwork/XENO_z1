"use client";

import React from 'react';
import Image from 'next/image';
import { fetchAllReviewImages } from '@/(FSD)/entities/product/api/useProductReviewListRead';
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import { useQuery } from '@tanstack/react-query';

const ReviewsPage = () => {
    const { data: reviewImages, isLoading, isError } = useQuery({
        queryKey: ['reviewImages'],
        queryFn: fetchAllReviewImages
    });

    if (isLoading) return <div>리뷰 로딩 중...</div>;
    if (isError) return <div>리뷰를 불러오는 데 실패했습니다.</div>;
    if (!reviewImages || reviewImages.length === 0) return <div>리뷰가 없습니다.</div>;

    return (
        <AppSection>
            <div className="grid grid-cols-3 gap-4">
                {reviewImages.map((image: string, index: number) => (
                    <div key={index} className="aspect-square relative overflow-hidden">
                        <Image
                            src={`data:image/jpeg;base64,${image}`}
                            alt={`리뷰 이미지 ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </AppSection>
    );
};

export default ReviewsPage;