import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

const AppSection = ({ children }: { children: ReactNode; }) => {
    return (
        <section data-slot={"section"} className={styles.section}>
            {children}
        </section>
    );
};

export default AppSection;