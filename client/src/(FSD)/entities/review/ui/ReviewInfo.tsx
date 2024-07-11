import { ReviewInfoType } from "@/(FSD)/shareds/types/review/ReviewInfo.type";
import React from "react";


interface ReviewInfoTypeProp {
    review: ReviewInfoType
}

const ReviewInfo = ({ review }: ReviewInfoTypeProp) => {


    return (
        <div>
            {review.text}
            <img
                src={`data:image/jpeg;base64,${review.reviewImage}`}

            />
        </div>
    )
}

export default ReviewInfo;