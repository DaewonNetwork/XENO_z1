import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import React from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"판매자 회원가입"} />
            </AppFixedTopBar>
            {children}
        </>
    );
};

export default Layout;