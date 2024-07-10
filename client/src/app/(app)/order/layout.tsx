'use client'


import ProductOrderBarContainer from "@/(FSD)/entities/product/ui/ProductOrderBarContainer";
import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import ProductHeader from "@/(FSD)/widgets/product/ui/ProductHeader";
import ProductOrderFooter from "@/(FSD)/widgets/product/ui/ProductOrderFooter";
import ProductOrderHeader from "@/(FSD)/widgets/product/ui/ProductOrderHeader";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const Layout = ({ children, }: { children: React.ReactNode }) => {


    return (
        <>
            <AppFixedTopBar>
                <ProductOrderHeader />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <ProductOrderFooter />
            </AppFixedBtmBar>
          
        </>
    );
};

export default Layout;