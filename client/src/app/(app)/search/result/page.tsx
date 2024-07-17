import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";
import { Metadata } from "next";
import ProductKeywordPage from "@/(FSD)/widgets/product/ui/ProductKeywordPage";

export const metadata: Metadata = {
    title: "XENO - 키워드 검색",
}

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