import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import ProductRankTopPage from "@/(FSD)/widgets/product/ui/ProductRankTopPage";
import React from "react";


const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ProductRankTopPage />
            </AppInner>
        </AppSection>
    );
};

export default Page;