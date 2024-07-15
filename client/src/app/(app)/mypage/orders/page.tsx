import React from "react";
import OrderCardList from '@/(FSD)/widgets/mypage/OrderCardList';
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";


const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <OrderCardList />
            </AppInner>
        </AppSection>
    );
};

export default Page;
