'use client'

import { productsState } from "@/(FSD)/shareds/stores/ProductAtom";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import { ProductList } from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import ProductOrderInfoContainer from "@/(FSD)/widgets/product/ui/ProductOrderInfoContainer";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const Page = () => {


    return (
        <AppSection>
        <ProductOrderInfoContainer />
        </AppSection>
    );
};

export default Page;