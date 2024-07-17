import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";
import ProductKeywordPage from "@/(FSD)/widgets/product/ui/ProductkeywordPage";

const Page = () => {
    return (
        <>
            <AppSection>
                <AppInner>
                    <ProductKeywordPage />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;