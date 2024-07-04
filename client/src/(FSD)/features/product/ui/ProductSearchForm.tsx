import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

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
        <form className={""} onSubmit={handleSubmit(onSubmit)}>

        </form>
    );
};

export default ProductSearchForm;