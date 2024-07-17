"use client";

import React, { useState } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import FileInputShared from "@/(FSD)/shareds/ui/FileInputShared";
import { useRecoilState, useSetRecoilState } from "recoil";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";

interface ProductImageCreateModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    files: File[] | null;
    detailFile: File | null;
}

const ProductImageCreateModal = ({ setIsOpen ,files, detailFile}: ProductImageCreateModalProps) => {
    const setProductImages = useSetRecoilState(productImagesState);
    const setProductDetailImage = useSetRecoilState(productDetailImageState);

    const [img1, setImg1] = useState<File>();
    const [img2, setImg2] = useState<File>();
    const [img3, setImg3] = useState<File>();
    const [img4, setImg4] = useState<File>();
    const [img5, setImg5] = useState<File>();
    const [img6, setImg6] = useState<File>();
    const [productDetailImg, setProductDetailImg] = useState<File>();

    const handleClick = () => {
        setProductImages([img1, img2, img3, img4, img5, img6]);
        setProductDetailImage(productDetailImg);
        setIsOpen(false);
    };

    return (
        <div className={`bg-background ${styles.product_image_create_modal}`}>
            <AppFixedTopBar>
                <AppTitleHeader
                    title={"이미지 등록하기"}
                    left={<Button size={"sm"} isIconOnly onClick={_ => { setIsOpen(false); }} variant={"light"}><IconShared iconType={"close"} /></Button>}
                />
            </AppFixedTopBar>
            <AppSection>
                <AppInner>
                    <TextMediumShared>상품 이미지</TextMediumShared>
                    <div className={styles.img_input_box}>
                        <FileInputShared inputId={"product_img1"} setFile={setImg1} file={files?.[0] || undefined} />
                        <FileInputShared inputId={"product_img2"} setFile={setImg2} file={files?.[1] || undefined} />
                        <FileInputShared inputId={"product_img3"} setFile={setImg3} file={files?.[2] || undefined} />
                        <FileInputShared inputId={"product_img4"} setFile={setImg4} file={files?.[3] || undefined} />
                        <FileInputShared inputId={"product_img5"} setFile={setImg5} file={files?.[4] || undefined} />
                        <FileInputShared inputId={"product_img6"} setFile={setImg6} file={files?.[5] || undefined} />
                    </div>

                    <TextMediumShared>상세 이미지</TextMediumShared>
                    <FileInputShared inputId={"product_detail_img"} setFile={setProductDetailImg} height={230} file={detailFile || undefined}/>

                    <Button isDisabled={!img1 || !productDetailImg} onClick={handleClick} size={"lg"} fullWidth color={"primary"}>완료</Button>
                </AppInner>
            </AppSection>
        </div>
    )
}

export default ProductImageCreateModal;