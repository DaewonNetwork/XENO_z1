import { ReviewType } from '@/(FSD)/shareds/types/Review.type';
import React from 'react'

interface ProductReviewCardType {
    review: ReviewType;
}

const ProductReviewCard = ({ review }: ProductReviewCardType) => {
    return (
        <div>
            {review.text}
        </div>
    )
}

export default ProductReviewCard;