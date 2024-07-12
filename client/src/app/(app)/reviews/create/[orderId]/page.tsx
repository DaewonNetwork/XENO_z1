
import ReviewCreateForm from "@/(FSD)/features/review/ui/ReviewCreateForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {
    return (
        <>
            <AppSection>
                <AppInner>
                    <ReviewCreateForm />
                </AppInner>
            </AppSection>
        </>
    )
}

export default Page;