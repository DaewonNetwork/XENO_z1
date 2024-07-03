import SellerAuthSigninForm from "@/(FSD)/features/seller/auth/ui/SellerAuthSigninForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {
    return (
        <>
            <AppSection>
                <AppInner>
                    <SellerAuthSigninForm />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;