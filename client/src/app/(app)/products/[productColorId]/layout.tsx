import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import ProductHeader from "@/(FSD)/widgets/product/ui/ProductHeader";
import ProductOrderBar from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import React from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <AppFixedTopBar>
                <ProductHeader />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <ProductOrderBar />
            </AppFixedBtmBar>
        </>
    );
};

export default Layout;