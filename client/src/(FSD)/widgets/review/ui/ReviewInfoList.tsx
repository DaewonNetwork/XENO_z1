"use client";

import { useReviewInfoListRead } from "@/(FSD)/entities/review/api/useReviewInfoListRead";
import React from "react";

const ReviewInfoList = () => {
    const { data } = useReviewInfoListRead();

    return (
        <div>

        </div>
    )
}

export default ReviewInfoList;