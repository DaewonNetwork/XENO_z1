import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import OrderDeliveryForm from "@/(FSD)/features/order/ui/OrderDeliveryForm";
import OrderProductInfoList from "@/(FSD)/widgets/order/ui/OrderProductInfoList";

const Page = () => {
    return (
        <AppSection isBgColor={true}>
            <OrderDeliveryForm />
            <OrderProductInfoList />
        </AppSection>
    );
};

export default Page;