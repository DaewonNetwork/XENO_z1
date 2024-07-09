import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import { productRankList } from "@/(FSD)/widgets/product/consts/productRankList";
import ProductCardList from "@/(FSD)/widgets/product/ui/ProductCardList";
import ProductCardListByCategory from "@/(FSD)/widgets/product/ui/ProductCardListByCategory";
import ProductCategorySelectBar from "@/(FSD)/widgets/product/ui/ProductCategorySelectBar";
import React from "react";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
           
                <ProductCategorySelectBar />
           
                <ProductCardListByCategory column={2} />
            </AppInner>
        </AppSection>
    );
};

export default Page;