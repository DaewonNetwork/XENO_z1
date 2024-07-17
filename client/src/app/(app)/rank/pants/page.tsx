import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import ProductRankPantsPage from "@/(FSD)/widgets/product/ui/ProductRankPantsPage";
import React from "react";


const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ProductRankPantsPage />
            </AppInner>
        </AppSection>
    );
};

export default Page;