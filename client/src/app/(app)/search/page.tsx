import ProductSearchForm from "@/(FSD)/features/product/ui/ProductSearchForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ProductSearchForm />
            </AppInner>
        </AppSection>
    );
};

export default Page;