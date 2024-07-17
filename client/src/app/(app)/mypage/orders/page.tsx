import React from "react";
import OrderInfoList from "@/(FSD)/widgets/mypage/OrderInfoList";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";


const Page = () => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"주문 목록"} />
            </AppFixedTopBar>
            <AppSection>
                <AppInner>
                    <OrderInfoList />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;
