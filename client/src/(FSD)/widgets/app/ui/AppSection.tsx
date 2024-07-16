import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

interface AppSectionProps {
    children: ReactNode;
    isBgColor?: boolean;
};

const AppSection = ({ isBgColor = false, children }: AppSectionProps) => {
    return (
        <section data-slot={"section"} className={`${isBgColor ? "bg-content2" : ""} ${styles.section}`}>
            {children}
        </section>
    );
};

export default AppSection;