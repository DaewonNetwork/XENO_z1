import React from "react";
import OrderInfoList from "@/(FSD)/widgets/mypage/OrderInfoList";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";


const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <OrderInfoList />
            </AppInner>
        </AppSection>
    );
};

export default Page;
