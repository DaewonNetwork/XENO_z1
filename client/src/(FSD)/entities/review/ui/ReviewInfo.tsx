import { ReviewInfoType } from "@/(FSD)/shareds/types/review/ReviewInfo.type";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ReviewStyle.module.scss";
import ItemShared from "@/(FSD)/shareds/ui/ItemShared";
import { useRouter } from "next/navigation";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import TextBoxShared from "@/(FSD)/shareds/ui/TextBoxShared";
import MenuBarShared from "@/(FSD)/shareds/ui/MenuBarShared";
import { useReviewDelete } from "@/(FSD)/features/review/api/useReviewDelete";
import StarListShared from "@/(FSD)/shareds/ui/StarListShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";

interface ReviewInfoProps {
    review: ReviewInfoType;
}

const ReviewInfo = ({ review }: ReviewInfoProps) => {
    const router = useRouter();
    if (!review) return <></>;

    const onSuccess = (data: any) => {

    };
    const { mutate } = useReviewDelete({ onSuccess });


    return (
        <div onClick={_ => router.push(`/reply/create?reviewId=${review.reviewId}`)} className={styles.review_item} style={{marginBottom:"5px"}}>
            <ItemShared>
                <AppInner>
                    <div className={styles.review_inner}>
                        <div className={styles.review_header}>
                            <div className={styles.top_item}>
                                <TextLargeShared>{review.userName}님</TextLargeShared>
                                <TextSmallShared>{review.createAt}</TextSmallShared>
                                {review.isReview &&
                                    <div className={styles.writer_item}>
                                        <MenuBarShared path={`/review/update?reviewId=${review.reviewId}`} mutate={mutate} id={review.reviewId}>

                                        </MenuBarShared>
                                    </div>
                                }
                            </div>
                            <div className={styles.btm_item}>
                                <StarListShared star={review.star} />
                            </div>
                        </div>
                        <div className={styles.review_content}>
                            <div className={styles.text_content}>
                                <TextBoxShared><TextMediumShared>{review.text}</TextMediumShared></TextBoxShared>
                            </div>
                            {review.reviewImage && (
                                <div className={styles.img_content}><img alt={"review_img"} src={`data:image/png;base64,${review.reviewImage}`} /></div>
                            )}
                        </div>
                    </div>
                </AppInner>
            </ItemShared>
        </div>
    )


}

export default ReviewInfo;