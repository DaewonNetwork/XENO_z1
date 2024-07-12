"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Button } from "@nextui-org/button";
import ProductImageCreateModal from "./ProductImageCreateModal";

const ProductCreateForm = () => {
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();

    const [isOpen, setIsOpen] = useState<boolean>(false);


    const schema = z.object({
        name: z.string(),
        season: z.string(),
        price: z.number(),
        priceSale: z.number(),
        productNumber: z.string(),
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <form className={styles.product_create_form} onSubmit={handleSubmit(onSubmit)}>
                <TextMediumShared isLabel={true} htmlFor={"name"}>상품 이름</TextMediumShared>
                <FormInputShared autoFocus={true} isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.name} radius={"none"} errorMessage={errors.name && <>{errors.name.message}</>} name={"name"} control={control} placeholder={"상품명을 입력해주세요."} />
                <TextMediumShared isLabel={true} htmlFor={"productNumber"}>품번</TextMediumShared>
                <FormInputShared isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.product_number} radius={"none"} errorMessage={errors.product_number && <>{errors.product_number.message}</>} name={"productNumber"} control={control} placeholder={"품번을 입력해주세요."} />
                <TextMediumShared isLabel={true} htmlFor={"season"}>시즌</TextMediumShared>
                <FormInputShared isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.season} radius={"none"} errorMessage={errors.season && <>{errors.season.message}</>} name={"season"} control={control} placeholder={"시즌을 입력해주세요."} />
                <TextMediumShared isLabel={true} htmlFor={"price"}>가격</TextMediumShared>
                <FormInputShared isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.price} radius={"none"} errorMessage={errors.price && <>{errors.price.message}</>} name={"price"} control={control} placeholder={"가격을 입력해주세요."} />
                <TextMediumShared isLabel={true} htmlFor={"priceSale"}>할인 가격</TextMediumShared>
                <FormInputShared isClearable size="lg" variant="flat" isInvalid={!!errors.priceSale} radius="none" errorMessage={errors.priceSale && <>{errors.priceSale.message}</>} name={"priceSale"} control={control} placeholder="할인 가격을 입력해주세요."/>
                <TextMediumShared isLabel={true} htmlFor={"color"}>색상</TextMediumShared>
                <FormInputShared isClearable size="lg" variant="flat" isInvalid={!!errors.color} radius="none" errorMessage={errors.color && <>{errors.color.message}</>} name={"color"} control={control} placeholder="색상을 입력해주세요."/>
                <TextMediumShared>이미지</TextMediumShared>
                <Button
                    onClick={_ => {
                        setIsOpen(true);
                    }}
                    fullWidth size={"lg"} type={"button"} variant={"ghost"}
                >
                    이미지 등록하기
                </Button>
                <Button fullWidth size={"lg"} type={"submit"} color={"primary"}>등록하기</Button>
            </form>
            {isOpen && <ProductImageCreateModal setIsOpen={setIsOpen} />}
        </>
    );
};

export default ProductCreateForm;