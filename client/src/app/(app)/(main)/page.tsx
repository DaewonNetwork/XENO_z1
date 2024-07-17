import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";
import ProductRankContainer from "@/(FSD)/widgets/product/ui/ProductRankContainer";
import styles from "@/(FSD)/shareds/styles/MainStyle.module.scss";
import MainBanner from "@/(FSD)/widgets/home/ui/MainBanner";
import banner from "../../../../asd.gif"


const Page = () => {
    return (
        <>
            <AppSection>
                <div className={styles.container}>
                    <MainBanner />
                    <ProductRankContainer />
                </div>
            </AppSection>
        </>
    );
};

export default Page;