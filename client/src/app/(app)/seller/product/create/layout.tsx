import IconShared from "@/(FSD)/shareds/ui/IconShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import React from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"상품 등록하기"} right={<LinkBtnShared href={"/search"} size={"sm"} isIconOnly endContent={<IconShared iconSize={"md"} iconType={"search"} />} />} />
            </AppFixedTopBar>
            {children}
        </>
    );
};

export default Layout;