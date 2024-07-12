'use client'

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/(FSD)/shareds/stores/UserAtom";
import UserInfo from "./UserInfo";

const MyPageInfoContainer = () => {

    const { isLoggedIn } = useRecoilValue(userState);

    const router = useRouter();

    const redirectToOrderInfo = () => {
        router.push('/mypage/orders')
    }



    return (
        <>
            {!isLoggedIn ? (
                <div>
                    <h2></h2>
                    <button >로그인</button>
                    <button >사용자 회원가입</button>
                    <button >판매자 회원가입</button>
                </div>

            ) : (
                <div>
                <UserInfo />
                <button onClick={redirectToOrderInfo}>주문내역 확인</button>
                </div>
            )}

        </>
    );
};


export default MyPageInfoContainer;
