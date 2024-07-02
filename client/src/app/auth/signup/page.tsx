import AuthSignupForm from "@/(FSD)/features/auth/ui/AuthSignupForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {
    return (
        <>
            <AppSection>
                <AppInner>
                    <AuthSignupForm />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;