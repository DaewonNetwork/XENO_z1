import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import OrderDeliveryForm from "@/(FSD)/features/order/ui/OrderDeliveryForm";
import OrderProductInfoList from "@/(FSD)/widgets/order/ui/OrderProductInfoList";
import OrderCompleteList from "@/(FSD)/widgets/order/ui/OrderCompleteList";

const Page = () => {
    return (
        <AppSection isBgColor={true}>
            <OrderCompleteList />

        </AppSection>
    );
};

export default Page;