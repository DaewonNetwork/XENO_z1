import React from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import AppContainer from "./AppContainer";
import AppInner from "./AppInner";
import TextXLargeShared from "@/(FSD)/shareds/ui/TextXlargeShared";
import BackBtnShared from "@/(FSD)/shareds/ui/BackBtnShared";
import ProductCart from "@/(FSD)/entities/product/ui/ProductCart";

interface AppTitleHeaderType {
    title: string;
    href?: string;
    right?: React.ReactNode;
}

const AppTitleHeader = ({ title, right = <ProductCart /> }: AppTitleHeaderType) => {
    return (
        <header className={styles.title_header}>
            <AppContainer>
                <AppInner>
                    <div className={styles.inner}>
                        <BackBtnShared />
                        <TextXLargeShared>{title}</TextXLargeShared>
                        {right}
                    </div>
                </AppInner>
            </AppContainer>
        </header>
    );
};

export default AppTitleHeader;