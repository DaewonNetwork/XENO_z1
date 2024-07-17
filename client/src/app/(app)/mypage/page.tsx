import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import MyPageInfoContainer from "@/(FSD)/widgets/mypage/MyPageInfoContainer";
import React from "react";

const Page = () => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"마이페이지"} />
            </AppFixedTopBar>
            <AppSection>
                <MyPageInfoContainer />
            </AppSection>
        </>
    );
};

export default Page;