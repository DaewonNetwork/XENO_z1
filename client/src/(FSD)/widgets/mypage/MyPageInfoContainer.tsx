"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

import UserInfo from "./UserInfo";
import { isLoggedInState } from "@/(FSD)/shareds/stores/UserAtom";
import UserInfoCard from "@/(FSD)/entities/seller/ui/UserInfoCard";
import OrderInfoListBtn from "../order/ui/OrderInfoListBtn";
import AppInner from "../app/ui/AppInner";

const MyPageInfoContainer = () => {
    const isLoggedIn = useRecoilValue(isLoggedInState);

    const router = useRouter();

    return (
        <AppInner>
                    <UserInfoCard />
                    <OrderInfoListBtn/>
        </AppInner>
    );
};


export default MyPageInfoContainer;