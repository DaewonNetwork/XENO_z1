import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import ReviewCardList from "@/(FSD)/widgets/review/ui/ReviewCardList";
import React from "react";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ReviewCardList />
            </AppInner>
        </AppSection>
    );
};

export default Page;