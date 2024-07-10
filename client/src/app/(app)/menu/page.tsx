
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import { productRankList } from "@/(FSD)/widgets/product/consts/productRankList";

import ProductCategorySelectBar from "@/(FSD)/widgets/product/ui/ProductCategorySelectBar";
import React from "react";
import ProductCategoryList from "@/(FSD)/widgets/product/ui/ProductCategoryList";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ProductCategorySelectBar />
                <ProductCategoryList  />
            </AppInner>
        </AppSection>
    );
};

export default Page;