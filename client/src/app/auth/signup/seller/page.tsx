import AuthSignupSellerForm from "@/(FSD)/features/auth/ui/AuthSignupSellerForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {
    return (
        <>
            <AppSection>
                <AppInner>
                    <AuthSignupSellerForm />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;