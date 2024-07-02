import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

const AppInner = ({ children }: { children: ReactNode }) => {
    return (
        <div data-slot={"inner"} className={styles.inner}>
            {children}
        </div>
    )
}

export default AppInner;