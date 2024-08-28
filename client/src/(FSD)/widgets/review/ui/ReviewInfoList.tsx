"use client";

import { useReviewInfoListRead } from "@/(FSD)/entities/review/api/useReviewInfoListRead";
import ReviewInfo from "@/(FSD)/entities/review/ui/ReviewInfo";
import { ReviewInfoType } from "@/(FSD)/shareds/types/review/ReviewInfo.type";
import React, { useEffect, useMemo, useState } from "react";
import style from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";

const ReviewInfoList = ({ productId }: { productId: string }) => {
    const [pageIndex, setPageIndex] = useState(1);

    const { data , refetch} = useReviewInfoListRead(Number(productId),pageIndex);

    const reviewList: ReviewInfoType[] = useMemo(() => {
        return data?.dtoList || [];
    }, [data]);


    useEffect(() => {}, [data]);

    useEffect(() => {
        refetch();
    }, [pageIndex]);



    if(!data && !reviewList) return <></>


    return (
        <div className={style.review_info_list} >

          {
                reviewList.map(review => (
                    <React.Fragment key={review.reviewId}>
                        <ReviewInfo review={review} />
                    </React.Fragment>
                ))
            }
        </div>
    );
};

export default ReviewInfoList;
