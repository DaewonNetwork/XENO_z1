"use client";

import { useReviewCardListRead } from "@/(FSD)/entities/review/api/useReviewCardListRead";
import ReviewCard from "@/(FSD)/entities/review/ui/ReviewCard";
import styles from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";
import { ReviewCardType } from "@/(FSD)/shareds/types/review/ReviewCard.type";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ReviewCardList = () => {
    const { reviewList, fetchNextPage, refetch, hasNextPage } = useReviewCardListRead();
    const { ref, inView } = useInView();

    useEffect(() => {
        refetch();
    }, [reviewList]);


    useEffect(() => {
        if (inView) {

            fetchNextPage();
        }
    }, [inView]);

    const reviewCardList: ReviewCardType[] = reviewList;

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
            <div ref={ref} />
        </div>
    )
}

export default ReviewCardList;