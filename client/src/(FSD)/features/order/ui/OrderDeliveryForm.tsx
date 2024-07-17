"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import { Checkbox } from "@nextui-org/checkbox";
import FormTextareaShared from "@/(FSD)/shareds/ui/FormTextareaShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";

const OrderDeliveryForm = () => {
    const schema = z.object({
        address: z.string().min(10).max(200),
        phoneNumber: z.string().min(11).max(15),
        message: z.string().optional(),
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data: any) => {
    };

    return (
        <form className={`bg-background ${styles.order_form}`} onSubmit={handleSubmit(onSubmit)}>
            <AppInner>
                <div className={styles.form_header}>
                    <TextLargeShared>배송 정보</TextLargeShared>
                    <Checkbox><TextSmallShared>저장하기</TextSmallShared></Checkbox>
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
                        <TextMediumShared isLabel={true} htmlFor={"message"}>배송 메세지</TextMediumShared>
                        <FormTextareaShared size={"lg"} isClearable isInvalid={!!errors.message} control={control} name={"message"} placeholder={"배송 메세지를 입력해주세요."} />
                    </div>

                </div>
            </AppInner>
        </form>
    )
}

export default OrderDeliveryForm;