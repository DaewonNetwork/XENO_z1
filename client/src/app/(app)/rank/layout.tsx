import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppNav from "@/(FSD)/widgets/app/ui/AppNav";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import React from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"상품 랭킹"} />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <AppNav />
            </AppFixedBtmBar>
        </>
    );
};

export default Layout;