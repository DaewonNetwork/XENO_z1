import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";

const ProductHeader = () => {
    return (
        <header className={styles.product_header}>
            <AppContainer>
                <AppInner>
                    a
                </AppInner>
            </AppContainer>
        </header>
    );
};

export default ProductHeader;