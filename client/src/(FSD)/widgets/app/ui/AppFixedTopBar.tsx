import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

const AppFixedTopBar = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.fixed_top_bar}>
            {children}
        </div>
    );
};

export default AppFixedTopBar;