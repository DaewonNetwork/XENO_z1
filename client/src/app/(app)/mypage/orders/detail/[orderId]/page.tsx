'use client'

import React, { useEffect } from 'react';
import { useUserRead } from '@/(FSD)/entities/user/api/useUserRead';
import { UserType } from '@/(FSD)/shareds/types/User.type';
import { useOrderListRead } from '@/(FSD)/entities/orders/api/useOrderListRead';
import { OrderInfoType } from '@/(FSD)/shareds/types/orders/OrderInfo.Type';
import { useRecoilValue } from 'recoil';
import { userState } from '@/(FSD)/shareds/stores/UserAtom';
import OrderCardList from '@/(FSD)/widgets/mypage/OrderCardList';
import OrderDetailInfo from '@/(FSD)/entities/orders/ui/OrderDetailInfo';


const Page = () => {

    const {isLoggedIn} = useRecoilValue(userState);
   
    if(!isLoggedIn) return <></>


    
    return (
        <div>
          <OrderDetailInfo/>
        </div>
    );
};

export default Page;
