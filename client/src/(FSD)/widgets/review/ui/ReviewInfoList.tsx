"use client";

import { useReviewInfoListRead } from "@/(FSD)/entities/review/api/useReviewInfoListRead";
import ReviewInfo from "@/(FSD)/entities/review/ui/ReviewInfo";
import { ReviewInfoType } from "@/(FSD)/shareds/types/review/ReviewInfo.type";
import React, { useEffect, useMemo, useState } from "react";
import style from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";

const ReviewInfoList = ({ productColorId }: { productColorId: string }) => {

    const [pageIndex,setPageIndex] = useState(1);

    const { data , refetch} = useReviewInfoListRead(Number(productColorId),pageIndex);

    const reviewList: ReviewInfoType[] = useMemo(() => {
        return data?.dtoList || [];
    }, [data]);


    useEffect(() => {
    
    }, [data]);

    useEffect(() => {
        refetch();
    }, [pageIndex]);



    if(!data && !reviewList) return <></>


    return (
        <div className={style.review_info_list} >
            <div className={style.review_info_header}>리뷰{data?.totalIndex}개</div>
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
