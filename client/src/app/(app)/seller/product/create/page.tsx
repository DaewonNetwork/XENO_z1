import ProductCreateForm from "@/(FSD)/features/product/ui/ProductCreateForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ProductCreateForm />
            </AppInner>
        </AppSection>
    )
}

export default Page;