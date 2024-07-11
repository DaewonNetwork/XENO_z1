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
import { useAuthSignup } from "../api/useAuthSignup";

const AuthSignupForm = () => {
    const userNameRegex = /^[가-힣a-zA-Z\s]{1,20}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    const [userData, setUserData] = useState<UserType | null>(null);
    
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
        router.push("/");
    }

    const { mutate } = useAuthSignup({ onSuccess });

    const onSubmit = (data: any) => {
        if ((!data.userName) || (!data.email) || (!data.password)) return;

        const user: UserType = {
            name: data.userName,
            email: data.email,
            password: data.password
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
            <label className={"text-medium font-semibold"} htmlFor={"password"}>비밀번호</label>
            <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.password} errorMessage={errors.password && <>{errors.password.message}</>} name={"password"} control={control} placeholder={"영문, 숫자 조합 8~16자"} />
            <label className={"text-medium font-semibold"} htmlFor={"confirmPassword"}>비밀번호 재입력</label>
            <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.confirmPassword} errorMessage={errors.confirmPassword && <>{errors.confirmPassword.message}</>} name={"confirmPassword"} control={control} placeholder={"비밀번호를 한 번 더 입력해주세요."} />
            <Button isDisabled={(!isValid) || (submitCount >= 5)} type={"submit"} variant={"solid"} color={(!isValid) || (submitCount >= 5) ? "default" : "primary"} size={"lg"} radius={"sm"} fullWidth>회원가입</Button>
        </form>
    );
};

export default AuthSignupForm;