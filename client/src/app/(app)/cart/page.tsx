import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import CartProductInfoList from "@/(FSD)/widgets/cart/ui/CartProductInfoList";

const Page = () => {
    return (
        <AppSection isBgColor={true}>
            <CartProductInfoList />
        </AppSection>
    );
};

export default Page;