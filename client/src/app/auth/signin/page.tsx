import AuthSigninForm from "@/(FSD)/features/auth/ui/AuthSigninForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {
    return (
        <>
            <AppSection>
                <AppInner>
                    <AuthSigninForm />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;