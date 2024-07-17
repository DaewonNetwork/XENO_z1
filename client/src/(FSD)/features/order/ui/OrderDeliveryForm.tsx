"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import FormTextareaShared from "@/(FSD)/shareds/ui/FormTextareaShared";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import { useUserRead } from "@/(FSD)/entities/user/api/useUserRead";
import { UserType } from "@/(FSD)/shareds/types/User.type";

const OrderDeliveryForm = () => {
    const schema = z.object({
        address: z.string().min(10).max(200),
        phoneNumber: z.string().min(11).max(15),
        req: z.string().optional(),
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data: any) => {
    };

    const { data } = useUserRead();

    const user: UserType = data;

    console.log(user);

    return (
        <form className={`bg-background ${styles.order_form}`} onSubmit={handleSubmit(onSubmit)}>
            <AppInner>
                <div className={styles.form_header}>
                    <TextLargeShared>배송 정보</TextLargeShared>
                </div>
                <div className={styles.form_body}>
                    <div className={styles.input_box}>
                        <TextMediumShared isLabel={true} htmlFor={"address"}>주소</TextMediumShared>
                        <FormInputShared isClearable isInvalid={!!errors.address} size={"md"} control={control} name={"address"} placeholder={"서울특별시 서초구"} />
                    </div>
                    <div className={styles.input_box}>
                        <TextMediumShared isLabel={true} htmlFor={"phoneNumber"}>전화번호</TextMediumShared>
                        <FormInputShared isClearable isInvalid={!!errors.phoneNumber} size={"md"} control={control} name={"phoneNumber"} placeholder={"01012345678"} />
                    </div>
                    <div className={styles.input_box}>
                        <TextMediumShared isLabel={true} htmlFor={"req"}>배송 메세지</TextMediumShared>
                        <FormTextareaShared size={"lg"} isInvalid={!!errors.req} control={control} name={"req"} placeholder={"배송 메세지를 입력해주세요."} />
                    </div>
                </div>
            </AppInner>
        </form>
    )
}

export default OrderDeliveryForm;