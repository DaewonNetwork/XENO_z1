import { ReviewType } from '@/(FSD)/shareds/types/Review.type';
import React from 'react';
import Image from 'next/image';

interface ProductReviewCardType {
    review: ReviewType;
    onClose: () => void;
}

const ProductReviewCard = ({ review, onClose }: ProductReviewCardType) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{review.nickname}의 리뷰</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        닫기
                    </button>
                </div>
                <div className="mb-4">
                    {review.reviewDetailImages && review.reviewDetailImages.length > 0 ? (
                        <Image
                            src={`data:image/jpeg;base64,${review.reviewDetailImages[0]}`}
                            alt="리뷰 이미지"
                            width={300}
                            height={300}
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    ) : (
                        <div>이미지가 없습니다.</div>
                    )}
                </div>
                <p className="mb-2">별점: {review.star}</p>
                <p className="mb-2">사이즈: {review.size}</p>
                <p>{review.text}</p>
            </div>
        </div>
    );
};

export default ProductReviewCard;