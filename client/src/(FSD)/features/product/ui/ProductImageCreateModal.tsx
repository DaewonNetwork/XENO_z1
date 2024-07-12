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

interface ProductImageCreateModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductImageCreateModal = ({ setIsOpen }: ProductImageCreateModalProps) => {
    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();
    const [img4, setImg4] = useState();
    const [img5, setImg5] = useState();
    const [img6, setImg6] = useState();
    const [bannerImg, setBannerImg] = useState();

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
                        <FileInputShared inputId={"product_img1"} setFile={setImg1} />
                        <FileInputShared inputId={"product_img2"} setFile={setImg2} />
                        <FileInputShared inputId={"product_img3"} setFile={setImg3} />
                        <FileInputShared inputId={"product_img4"} setFile={setImg4} />
                        <FileInputShared inputId={"product_img5"} setFile={setImg5} />
                        <FileInputShared inputId={"product_img6"} setFile={setImg6} />
                    </div>

                    <TextMediumShared>상세 이미지</TextMediumShared>
                    <FileInputShared inputId={"product_banner_img"} setFile={setBannerImg} height={230} />

                    <Button fullWidth color={"primary"}>등록하기</Button>
                </AppInner>
            </AppSection>
        </div>
    )
}

export default ProductImageCreateModal;