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
import { useAuthSignupSeller } from "../api/useAuthSignupSeller";
import { useSetRecoilState } from "recoil";
import { userState } from "@/(FSD)/shareds/stores/UserAtom";

const AuthSignupSellerForm = () => {
    const userNameRegex = /^[가-힣a-zA-Z\s]{1,20}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    const companyIdRegex = /^\d{10}$/;
    const phoneNumberRegex = /^\d{11}$/;

    const [userData, setUserData] = useState<UserType | null>(null);

    const setUser = useSetRecoilState(userState);
    
    const schema = z.object({
        userName: z.string().regex(userNameRegex, { message: "알맞은 이름을 입력해주세요." }),
        email: z.string().regex(emailRegex, {
            message: "알맞은 이메일 주소를 입력해주세요."
        }).refine((email) => {
            return !!email;
        }, {
            message: "이미 가입된 이메일 주소입니다."
        }),
        password: z.string().regex(passwordRegex, {
            message: "알맞는 비밀번호를 입력해주세요."
        }),
        confirmPassword: z.string(),
        companyId: z.string().regex(companyIdRegex, {
            message: "사업자 번호는 10자리 숫자여야 합니다."
        }),
        phoneNumber: z.string().regex(phoneNumberRegex, {
            message: "전화번호는 11자리 숫자여야 합니다."
        }),
        address: z.string().min(1, { 
            message: "주소를 입력해주세요." }),
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
        console.log("Signup success:", data);
        if(!data) {
            console.error("User data is null");
            return;
        }
        setUser({ user: data });
        router.push("/");
    }

    // const onError = (error: any) => {
        // console.error("Signup error:", error);
        // 여기에 에러 처리 로직을 추가하세요 (예: 사용자에게 에러 메시지 표시)
    // }

    const { mutate } = useAuthSignupSeller({ onSuccess });

    const onSubmit = (data: any) => {
        if ((!data.userName) || (!data.email) || (!data.password) || (!data.companyId) || (!data.address) || (!data.phoneNumber)) return;
    
        const user: UserType = {
            name: data.userName,
            email: data.email,
            password: data.password,
            companyId: data.companyId,
            address: data.address,
            phoneNumber: data.phoneNumber
        };
    
        setUserData(user);
        mutate(user);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={"text-medium font-semibold"} htmlFor={"userName"}>이름</label>
            <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.userName} errorMessage={errors.userName && <>{errors.userName.message}</>} name={"userName"} type={"text"} autoFocus={true} isRequired control={control} placeholder={"홍길동"} />
            <label className={"text-medium font-semibold"} htmlFor={"email"}>이메일</label>
            <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.email} radius={"none"} errorMessage={errors.email && <>{errors.email.message}</>} name={"email"} control={control} placeholder={"abc1234@gmail.com"} />
            <label className={"text-medium font-semibold"} htmlFor={"phoneNumber"}>전화번호</label>
            <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.phoneNumber} radius={"none"} errorMessage={errors.phoneNumber && <>{errors.phoneNumber.message}</>} name={"phoneNumber"} control={control} placeholder={"-없이 입력"} />
            <label className={"text-medium font-semibold"} htmlFor={"address"}>주소</label>
            <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.address} radius={"none"} errorMessage={errors.address && <>{errors.address.message}</>} name={"address"} control={control} placeholder={"주소"} />
            <label className={"text-medium font-semibold"} htmlFor={"password"}>비밀번호</label>
            <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.password} errorMessage={errors.password && <>{errors.password.message}</>} name={"password"} control={control} placeholder={"영문, 숫자 조합 8~16자"} />
            <label className={"text-medium font-semibold"} htmlFor={"confirmPassword"}>비밀번호 재입력</label>
            <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.confirmPassword} errorMessage={errors.confirmPassword && <>{errors.confirmPassword.message}</>} name={"confirmPassword"} control={control} placeholder={"비밀번호를 한 번 더 입력해주세요."} />
            <label className={"text-medium font-semibold"} htmlFor={"companyId"}>사업자 번호</label>
            <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.companyId} errorMessage={errors.companyId && <>{errors.companyId.message}</>} name={"companyId"} control={control} placeholder={"10자리 숫자 입력"} />
            <Button isDisabled={(!isValid) || (submitCount >= 5)} type={"submit"} variant={"solid"} color={(!isValid) || (submitCount >= 5) ? "default" : "primary"} size={"lg"} radius={"sm"} fullWidth>판매자 회원가입</Button>
        </form>
    );
};

export default AuthSignupSellerForm;