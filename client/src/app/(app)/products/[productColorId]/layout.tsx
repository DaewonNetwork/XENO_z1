'use client'

import ProductOrderContainer from "@/(FSD)/features/product/ui/ProductOrderContainer";
import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import ProductHeader from "@/(FSD)/widgets/product/ui/ProductHeader";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const Layout = ({ children, }: { children: React.ReactNode }) => {


    return (
        <>
            <AppFixedTopBar>
                <ProductHeader />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <ProductOrderContainer />
            </AppFixedBtmBar>
        </>
    );
};

export default Layout;