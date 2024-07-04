import SellerAuthSignupForm from "@/(FSD)/features/seller/auth/ui/SellerAuthSignupForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {
    return (
        <>
            <AppSection>
                <AppInner>
                    <SellerAuthSignupForm />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;