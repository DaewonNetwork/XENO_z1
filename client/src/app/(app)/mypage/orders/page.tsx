'use client'

import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '@/(FSD)/shareds/stores/UserAtom';
import OrderCardList from '@/(FSD)/widgets/mypage/OrderCardList';
import AppSection from '@/(FSD)/widgets/app/ui/AppSection';


const Page = () => {

    const isLoggedIn = useRecoilValue(isLoggedInState);

    if (!isLoggedIn) return <></>



    return (
        <div>
            <AppSection>
                <OrderCardList />
            </AppSection>
        </div>
    );
};

export default Page;
