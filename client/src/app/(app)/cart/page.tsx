import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import CartProductInfoList from "@/(FSD)/widgets/cart/ui/CartProductInfoList";
import CartProductSelectBar from "@/(FSD)/features/cart/ui/CartProductSelectBar";

const Page = () => {
    return (
        <AppSection isBgColor={true}>
            <CartProductSelectBar />
            <CartProductInfoList />
        </AppSection>
    );
};

export default Page;