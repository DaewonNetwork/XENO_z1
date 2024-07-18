"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import PasswordInputShared from "@/(FSD)/shareds/ui/PasswordInputShared";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/AuthStyle.module.scss";
import { UserType } from "@/(FSD)/shareds/types/User.type";
import { useAuthSignin } from "../api/useAuthSignin";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInState } from "@/(FSD)/shareds/stores/UserAtom";

const AuthSigninForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    const [userData, setUserData] = useState<UserType | null>(null);
    
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);


    const schema = z.object({
        email: z.string().regex(emailRegex, {
            message: "알맞은 이메일 주소를 입력해주세요."
        }),
        password: z.string().regex(passwordRegex, {
            message: "알맞은 비밀번호를 입력해주세요."
        })
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const router = useRouter();

    const onSuccess = (data: any) => {
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);        
        
        setIsLoggedIn(true);

        router.push("/");
    }

    const onError = () => {

    }

    const { mutate } = useAuthSignin({ onSuccess, onError });

    const onSubmit = (data: any) => {
        if ((!data.email) || (!data.password)) return;

        const user: any = {
            email: data.email,
            password: data.password
        };
       
        setUserData(user);
       
        mutate(user);
    };

    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={"text-medium font-semibold"} htmlFor={"email"}>이메일</label>
            <FormInputShared isClearable autoFocus={true} size={"lg"} variant={"underlined"} isInvalid={!!errors.email} radius={"none"} errorMessage={errors.email && <>{errors.email.message}</>} name={"email"} control={control} placeholder={"이메일을 입력해주세요."} />
            <label className={"text-medium font-semibold"} htmlFor={"password"}>비밀번호</label>
            <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.password} radius={"none"} errorMessage={errors.password && <>{errors.password.message}</>} name={"password"} control={control} placeholder={"비밀번호를 입력해주세요."} />
            <Button isDisabled={(!isValid) || (submitCount >= 5)} type={"submit"} variant={"solid"} color={(!isValid) || (submitCount >= 5) ? "default" : "primary"} size={"lg"} radius={"sm"} fullWidth>로그인</Button>
            <Button  variant={"solid"} onClick={() => router.push('/auth/signup')} size={"lg"} radius={"sm"} fullWidth>회원가입</Button>
            <Button  variant={"solid"} onClick={() => router.push('/seller/auth/signup')} size={"lg"} radius={"sm"} fullWidth>판매자 회원가입</Button>
        </form>
        </>

    );
};

export default AuthSigninForm;