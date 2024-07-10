"use client";

import { useReviewCardListRead } from "@/(FSD)/entities/review/api/useReviewCardListRead";
import ReviewCard from "@/(FSD)/entities/review/ui/ReviewCard";
import styles from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";
import { ReviewCardType } from "@/(FSD)/shareds/types/review/ReviewCard.type";
import React from "react";

const ReviewCardList = () => {
    const { data } = useReviewCardListRead();

    const reviewCardList: ReviewCardType[] = data || [
        {
            reviewId: 0,
            reviewImage: null,
            productName: "asdasdasdd",
            brandName: "asdasdasdsad",
        },
        {
            reviewId: 1,
            reviewImage: null,
            productName: "asdasdasdd",
            brandName: "asdasdasdsad",
        },
        {
            reviewId: 2,
            reviewImage: null,
            productName: "asdasdasdd",
            brandName: "asdasdasdsad",
        },
        {
            reviewId: 3,
            reviewImage: null,
            productName: "asdasdasdd",
            brandName: "asdasdasdsad",
        },
        {
            reviewId: 4,
            reviewImage: null,
            productName: "asdasdasdd",
            brandName: "asdasdasdsad",
        },
        {
            reviewId: 5,
            reviewImage: null,
            productName: "asdasdasdd",
            brandName: "asdasdasdsad",
        }
    ];

    if (!reviewCardList) return <></>;

    return (
        <div className={styles.review_card_list}>
            {
                reviewCardList.map(review => (
                    <React.Fragment key={review.reviewId}>
                        <ReviewCard review={review} />
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default ReviewCardList;