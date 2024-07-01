import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppHeader from "@/(FSD)/widgets/app/ui/AppHeader";
import React from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <AppFixedTopBar>
                <AppHeader />
            </AppFixedTopBar>
            {children}
        </>
    );
};

export default Layout;