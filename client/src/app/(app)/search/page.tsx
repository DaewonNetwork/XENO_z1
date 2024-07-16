import ProductSearchForm from "@/(FSD)/features/product/ui/ProductSearchForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import ProductkeywordPage from "@/(FSD)/widgets/product/ui/ProductkeywordPage";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "XENO - 키워드 검색",
}

const Page = () => {
    return (
        <>
            <AppSection>
                <AppInner>
                    <ProductSearchForm />
                    <ProductkeywordPage />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;