import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import styles from "@/(FSD)/shareds/styles/MainStyle.module.scss";
import React from "react";
import ProductInfoContainer from "@/(FSD)/entities/product/ui/ProductInfoContainer";

const Page = () => {
    return (
        <div>
            <AppSection>
                <ProductInfoContainer />
            </AppSection>
        </div>
    );
};

export default Page;