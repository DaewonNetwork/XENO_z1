'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import styles from "@/(FSD)/shareds/styles/AuthStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import { useSellerInfoRead } from "../api/useSellerInfoRead";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";


interface UserInfoType {
    brandName: string
    name: string
}

const UserInfoCard = () => {
    
   const {data,isLoading} = useSellerInfoRead();


   const userInfo:UserInfoType = data

   useEffect(() => {

   },[data])
   if(!data && !userInfo && isLoading) return <></>

    return (
    <div className={styles.user_info_card}>
       <div className={styles.user_info}>
       <TextLargeShared>{userInfo.brandName}</TextLargeShared><TextMediumShared> {userInfo.name}님 환영합니다.</TextMediumShared>
        <br/>
        </div>
        <div className={styles.user_modify} >
        <Button className="w-full h-[40px] bg-white border-2" radius="none" >로그아웃</Button>
        <Button className="w-full h-[40px] bg-white border-2" radius="none" >회원 정보 수정</Button>
        </div>
    </div>
    );
};

export default UserInfoCard;