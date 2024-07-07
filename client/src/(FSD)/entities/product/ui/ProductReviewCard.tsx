import { ReviewType } from '@/(FSD)/shareds/types/Review.type';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductReviewCardType {
    review: ReviewType;
    onClose: () => void;
}

const ProductReviewCard = ({ review, onClose }: ProductReviewCardType) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="fixed inset-x-0 top-[50px] bottom-[50px] flex items-end justify-center z-50">
            <div 
                className={`bg-white w-full h-full transform transition-transform duration-300 ease-out ${
                    isVisible ? 'translate-y-0' : 'translate-y-full'
                } bg-background ComponentStyle_root_box__xVfCO`}
            >
                <div className="h-full overflow-y-auto p-4">
                    <div className="flex justify-end items-center mb-4 sticky top-0 bg-white z-10">
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            닫기
                        </button>
                    </div>
                    <div className="mb-4">
                        {review.reviewDetailImages && review.reviewDetailImages.length > 0 ? (
                            <Image
                                src={`data:image/jpeg;base64,${review.reviewDetailImages[0]}`}
                                alt="리뷰 이미지"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                                className="rounded-lg"
                            />
                        ) : (
                            <div>이미지가 없습니다.</div>
                        )}
                    </div>
                    <h2 className="text-xl font-bold">{review.name}의 리뷰</h2>
                    <div className="mb-4">
                        <p className="text-sm text-gray-500">작성일: {new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="mb-4 flex items-center">
                        <div className="mr-4">
                            <Image
                                src={`data:image/jpeg;base64,${review.productImages[0]}`}
                                alt="제품 이미지"
                                width={50}
                                height={50}
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <p className="font-bold">{review.productName}</p>
                            <p>색상: {review.color}</p>
                            <p>사이즈: {review.size}</p>
                            
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="font-bold">별점: {review.star}</p>
                    </div>
                    <div className="mb-4">
                        <p>{review.text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReviewCard;