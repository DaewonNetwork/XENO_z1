import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import ProductRankOuterPage from "@/(FSD)/widgets/product/ui/ProductRankOuterPage";
import React from "react";


const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ProductRankOuterPage />
            </AppInner>
        </AppSection>
    );
};

export default Page;