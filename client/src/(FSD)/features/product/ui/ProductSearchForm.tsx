"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

const ProductSearchForm = () => {

    const schema = z.object({
        keyword: z.string(),
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form className={styles.product_search_form} onSubmit={handleSubmit(onSubmit)}>
            <FormInputShared startContent={<IconShared iconType={"search"} />} radius={"sm"} isClearable autoFocus={true} size={"md"} variant={"flat"} isInvalid={!!errors.keyword} errorMessage={errors.keyword && <>{errors.keyword.message}</>} name={"keyword"} control={control} placeholder={"검색어를 입력해주세요."} />
        </form>
    );
};

export default ProductSearchForm;