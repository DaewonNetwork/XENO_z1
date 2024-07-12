'use client'

import React, { useEffect } from 'react';
import { useUserRead } from '@/(FSD)/entities/user/api/useUserRead';
import { UserType } from '@/(FSD)/shareds/types/User.type';
import { useOrderListRead } from '@/(FSD)/entities/orders/api/useOrderListRead';
import { OrderInfoType } from '@/(FSD)/shareds/types/orders/OrderInfo.Type';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '@/(FSD)/shareds/stores/UserAtom';
import OrderCardList from '@/(FSD)/widgets/mypage/OrderCardList';


const Page = () => {

    const isLoggedIn = useRecoilValue(isLoggedInState);
   
    if(!isLoggedIn) return <></>


    
    return (
        <div>
          <OrderCardList/>
        </div>
    );
};

export default Page;
