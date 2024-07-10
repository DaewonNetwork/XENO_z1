import AppSection from "@/(FSD)/widgets/app/ui/AppSection";

import React from "react";
import ProductInfoContainer from "@/(FSD)/entities/product/ui/ProductInfoContainer";

const Page = () => {
    return (
        <>
            <AppSection>
                <ProductInfoContainer />
            </AppSection>
        </>
    );
};

export default Page;