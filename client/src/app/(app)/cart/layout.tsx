import IconShared from "@/(FSD)/shareds/ui/IconShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppNav from "@/(FSD)/widgets/app/ui/AppNav";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import React from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"장바구니"} right={<LinkBtnShared href={"/"} size={"sm"} isIconOnly endContent={<IconShared iconSize={"md"} iconType={"search"} />} />} />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <AppNav />
            </AppFixedBtmBar>
        </>
    );
};

export default Layout;