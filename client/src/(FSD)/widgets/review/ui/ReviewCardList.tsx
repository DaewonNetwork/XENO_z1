"use client";

import { useReviewCardListRead } from "@/(FSD)/entities/review/api/useReviewCardListRead";
import styles from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";
import React from "react";

const ReviewCardList = () => {
    const { data } = useReviewCardListRead();

    return (
        <div className={styles.review_card_list}>
            
        </div>
    )
}

export default ReviewCardList;