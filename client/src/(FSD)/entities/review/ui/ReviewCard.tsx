import { ReviewCardType } from "@/(FSD)/shareds/types/review/ReviewCard.type";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";
import { Skeleton } from "@nextui-org/skeleton";
import { useRouter } from "next/navigation";

interface ReviewCardProps {
    review: ReviewCardType;

}

const ReviewCard = ({ review }: ReviewCardProps) => {
    if(!review) return <></>
    const router = useRouter();

    return (
        <div
            onClick={_ => {
                router.push(`/reviews/info/${review.reviewId}/${review.productColorId}`);
            }}
            className={styles.review_card}
        >
            <div className={`rounded-medium ${styles.review_image}`}>
                {/* <Skeleton className={styles.review_skeleton} /> */}
                <img
                    src={`data:image/jpeg;base64,${review.reviewImage}`}
                />
            </div>
        </div>
    );
};

export default ReviewCard;