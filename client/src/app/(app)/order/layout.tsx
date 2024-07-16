import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import OrderBtnBar from "@/(FSD)/widgets/order/ui/OrderBtnBar";
import React from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"결제하기"} />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <OrderBtnBar />
            </AppFixedBtmBar>
        </>
    );
};

export default Layout;