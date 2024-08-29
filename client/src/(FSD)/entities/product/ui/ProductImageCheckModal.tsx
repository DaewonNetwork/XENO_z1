"use client";

import React, { useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { useProductUploadImagesRead } from "../api/useProductUploadImagesRead";
import { ImageListType } from "@/(FSD)/features/product/ui/ProductCreateForm";

interface ProductImageCheckModalProps {
    setCheckOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductImageCheckModal = ({ setCheckOpen }: ProductImageCheckModalProps) => {
    const { data, isError, error, isPending, refetch } = useProductUploadImagesRead();
    const images: ImageListType[] = data || [];

    useEffect(() => {
        refetch();
    }, [refetch]);

    const copyImagesToClipboard = (imageUrls: string[]) => {
        // 유효한 URL만 필터링
        const validUrls = imageUrls.filter(url => url);
        if (validUrls.length === 0) {
            alert('복사할 이미지 URL이 없습니다.');
            return;
        }

        // 탭으로 구분된 URL 문자열 생성
        const urlsText = validUrls.join('\t');

        // 클립보드에 복사
        navigator.clipboard.writeText(urlsText).then(() => {
            console.log('이미지 URL이 클립보드에 복사되었습니다.');
            alert('이미지 URL이 클립보드에 복사되었습니다.');
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
            alert('클립보드 복사에 실패했습니다.');
        });
    };

    if (!images) return <></>;

    return (
        <div className={`bg-background ${styles.product_image_create_modal}`}>
            <AppFixedTopBar>
                <AppTitleHeader
                    title={"이미지 조회하기"}
                    left={<Button size={"sm"} isIconOnly onClick={() => setCheckOpen(false)} variant={"light"}><IconShared iconType={"close"} /></Button>}
                />
            </AppFixedTopBar>
            {images.map((image) => (
                <AppSection key={image.productNumber}>
                    <AppInner>
                        <TextMediumShared>품번 : {image.productNumber}</TextMediumShared>

                        <TextMediumShared>상품 이미지</TextMediumShared>
                        <div className={styles.img_input_box}>
                            {[
                                image.url_1, image.url_2, image.url_3, image.url_4, image.url_5, image.url_6
                            ].map((url, index) => (
                                <div key={index} className={styles.preview_img_box}>
                                    {url ? (
                                        <img src={url} alt={`상품 이미지 ${index + 1}`} />
                                    ) : (
                                        <div className={styles.preview_img_box}>
                                            <TextMediumShared>이미지 없음</TextMediumShared>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div>
                                <Button onClick={() => copyImagesToClipboard([
                                    image.url_1, image.url_2, image.url_3, image.url_4, image.url_5, image.url_6
                                ])}>
                                    이미지 링크 일괄 복사하기
                                </Button>
                            </div>

                            <TextMediumShared>상세 이미지</TextMediumShared>
                            {image.detailUrl ? (
                                <div className={styles.preview_img_box}>
                                    <img src={image.detailUrl} alt="상세 이미지" />
                                </div>


                            ) : (
                                <div className={styles.empty_image_box}>
                                    <TextMediumShared>상세 이미지 없음</TextMediumShared>
                                </div>
                            )}

                            <div>
                                <Button onClick={() => copyImagesToClipboard([
                                    image.detailUrl
                                ])}>
                                    상세 이미지 링크 복사하기
                                </Button>
                            </div>
                        </div>
                    </AppInner>
                </AppSection>
            ))}
        </div>
    );
};

export default ProductImageCheckModal;
