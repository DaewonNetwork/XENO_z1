'use client'


import ProductOrderBarContainer from "@/(FSD)/entities/product/ui/ProductOrderBarContainer";
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
                <ProductOrderBarContainer />
            </AppFixedBtmBar>
        </>
    );
};

export default Layout;