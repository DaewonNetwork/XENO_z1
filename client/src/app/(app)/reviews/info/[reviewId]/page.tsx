import ReviewInfo from "@/(FSD)/entities/review/ui/ReviewInfo";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import ReviewInfoContainer from "@/(FSD)/widgets/review/ui/ReviewInfoContainer";
import React from "react";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ReviewInfoContainer/>
            </AppInner>
        </AppSection>
    );
};

export default Page;