"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import PasswordInputShared from "@/(FSD)/shareds/ui/PasswordInputShared";
import { Button } from "@nextui-org/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "@/(FSD)/shareds/styles/AuthStyle.module.scss";
import { UserType } from "@/(FSD)/shareds/types/User.type";
import { useSetRecoilState } from "recoil";
import { userState } from "@/(FSD)/shareds/stores/UserAtom";

const SellerAuthSignupForm = () => {
    const companyIdRegex = /^\d{3}-\d{2}-\d{5}$/;
    const brandNameRegex = /^[가-힣a-zA-Z\s]{1,20}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    const [userData, setUserData] = useState<UserType | null>(null);

    const setUser = useSetRecoilState(userState);
    
    const schema = z.object({
        brandName: z.string().regex(brandNameRegex, { message: "알맞은 이름을 입력해주세요." }),
        email: z.string().regex(emailRegex, {
            message: "알맞은 이메일 주소를 입력해주세요."
        }).refine((email) => {
            return !!email;
        }, {
            message: "이미 가입된 이메일 주소입니다."
        }),
        companyId: z.string()
        .max(10, {
            message: "알맞은 사업자등록번호를 입력해주세요."
        })
        .min(10, {
            message: "알맞은 사업자등록번호를 입력해주세요."
        }),
        password: z.string().regex(passwordRegex, {
            message: "알맞는 비밀번호를 입력해주세요."
        }),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
    });


    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const router = useRouter();

    const onSuccess = (data: any) => {
        if(!userData) return;
        setUser({ user: userData });
        router.push("/");
    }

    const onSubmit = (data: any) => {
        if ((!data.brandName) || (!data.email) || (!data.password)) return;

        const user: UserType = {
            brandName: data.brandName,
            email: data.email,
            password: data.password
        };

        setUserData(user);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={"text-medium font-semibold"} htmlFor={"brandName"}>브랜드 이름</label>
            <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.brandName} errorMessage={errors.brandName && <>{errors.brandName.message}</>} name={"brandName"} type={"text"} autoFocus={true} isRequired control={control} placeholder={"XENO"} />
            <label className={"text-medium font-semibold"} htmlFor={"companyId"}>사업자등록번호</label>
            <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.companyId} radius={"none"} errorMessage={errors.companyId && <>{errors.companyId.message}</>} name={"companyId"} control={control} placeholder={"123-45-67890"} />
            <label className={"text-medium font-semibold"} htmlFor={"email"}>이메일</label>
            <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.email} radius={"none"} errorMessage={errors.email && <>{errors.email.message}</>} name={"email"} control={control} placeholder={"abc1234@gmail.com"} />
            <label className={"text-medium font-semibold"} htmlFor={"password"}>비밀번호</label>
            <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.password} errorMessage={errors.password && <>{errors.password.message}</>} name={"password"} control={control} placeholder={"영문, 숫자 조합 8~16자"} />
            <label className={"text-medium font-semibold"} htmlFor={"confirmPassword"}>비밀번호 재입력</label>
            <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.confirmPassword} errorMessage={errors.confirmPassword && <>{errors.confirmPassword.message}</>} name={"confirmPassword"} control={control} placeholder={"비밀번호를 한 번 더 입력해주세요."} />
            <Button isDisabled={(!isValid) || (submitCount >= 5)} type={"submit"} variant={"solid"} color={(!isValid) || (submitCount >= 5) ? "default" : "primary"} size={"lg"} radius={"sm"} fullWidth>회원가입</Button>
        </form>
    );
};

export default SellerAuthSignupForm;