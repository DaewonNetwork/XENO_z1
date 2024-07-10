
import AuthSellerSignupForm from "@/(FSD)/features/auth/ui/AuthSellerSignupForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {
    return (
        <>
            <AppSection>
                <AppInner>
                    <AuthSellerSignupForm />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;