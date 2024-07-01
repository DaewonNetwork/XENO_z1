import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

const AppFixedBtmBar = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.fixed_btm_bar}>
            {children}
        </div>
    );
};

export default AppFixedBtmBar;