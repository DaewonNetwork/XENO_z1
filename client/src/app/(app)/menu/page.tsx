import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import { productRankList } from "@/(FSD)/widgets/product/consts/productRankList";
import ProductCardList from "@/(FSD)/widgets/product/ui/ProductCardList";
import ProductCategorySelectBar from "@/(FSD)/widgets/product/ui/ProductCategorySelectBar";
import React from "react";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ProductCategorySelectBar />
                <ProductCardList column={2} productList={productRankList} />
            </AppInner>
        </AppSection>
    );
};

export default Page;