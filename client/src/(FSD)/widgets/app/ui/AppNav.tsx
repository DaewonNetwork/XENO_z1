import React from "react";
import AppInner from "./AppInner";
import AppContainer from "./AppContainer";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";

const AppNav = () => {
    return (
        <nav className={styles.nav}>
            <AppContainer>
                <AppInner>
                    <div className={styles.nav_inner}>

                    </div>
                </AppInner>
            </AppContainer>

        </nav>
    );
};

export default AppNav;