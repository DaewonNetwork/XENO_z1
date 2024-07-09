"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

const ProductCreateForm = () => {
    const schema = z.object({
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form className={styles.product_create_form} onSubmit={handleSubmit(onSubmit)}>

        </form>
    );
};

export default ProductCreateForm;