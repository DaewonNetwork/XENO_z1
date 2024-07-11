"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import Slider from "react-slick";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import FileInputShared from "@/(FSD)/shareds/ui/FileInputShared";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

const ProductCreateForm = () => {
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();

    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();
    const [img4, setImg4] = useState();
    const [img5, setImg5] = useState();

    const [detailImg, setDetailImg] = useState();

    const schema = z.object({
        name: z.string(),
        season: z.string(),
        price: z.number(),
        price_sale: z.number(),
        product_number: z.string(),
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
    };

    return (
        <form className={styles.product_create_form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.image_input_list}>
                <Slider {...settings}>
                    <FileInputShared inputId={"img1"} setFile={setImg1}><IconShared iconType={"plus"} /></FileInputShared>
                    <FileInputShared inputId={"img2"} setFile={setImg2}><IconShared iconType={"plus"} /></FileInputShared>
                    <FileInputShared inputId={"img3"} setFile={setImg3}><IconShared iconType={"plus"} /></FileInputShared>
                    <FileInputShared inputId={"img4"} setFile={setImg4}><IconShared iconType={"plus"} /></FileInputShared>
                    <FileInputShared inputId={"img5"} setFile={setImg5}><IconShared iconType={"plus"} /></FileInputShared>
                </Slider>
            </div>
            <FileInputShared inputId={"detail_img"} setFile={setDetailImg} />

            <TextMediumShared isLabel={true} htmlFor={"name"}>상품 이름</TextMediumShared>
            <FormInputShared isClearable autoFocus={true} size={"lg"} variant={"flat"} isInvalid={!!errors.name} radius={"none"} errorMessage={errors.name && <>{errors.name.message}</>} name={"name"} control={control} placeholder={"상품명을 입력해주세요."} />
            <TextMediumShared isLabel={true} htmlFor={"product_number"}>품번</TextMediumShared>
            <FormInputShared isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.product_number} radius={"none"} errorMessage={errors.product_number && <>{errors.product_number.message}</>} name={"product_number"} control={control} placeholder={"품번을 입력해주세요."} />
            <TextMediumShared isLabel={true} htmlFor={"season"}>시즌</TextMediumShared>
            <FormInputShared isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.season} radius={"none"} errorMessage={errors.season && <>{errors.season.message}</>} name={"season"} control={control} placeholder={"시즌을 입력해주세요."} />
            <TextMediumShared isLabel={true} htmlFor={"price"}>가격</TextMediumShared>
            <FormInputShared isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.price} radius={"none"} errorMessage={errors.price && <>{errors.price.message}</>} name={"price"} control={control} placeholder={"가격을 입력해주세요."} />
        </form>
    );
};

export default ProductCreateForm;