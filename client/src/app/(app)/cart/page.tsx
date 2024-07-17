import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import CartProductInfoList from "@/(FSD)/widgets/cart/ui/CartProductInfoList";
import CartSummaryBar from "@/(FSD)/widgets/cart/ui/CartSummaryBar";

const Page = () => {
    return (
        <AppSection isBgColor={true}>
            <CartProductInfoList />
            <CartSummaryBar />
        </AppSection>
    );
};

export default Page;