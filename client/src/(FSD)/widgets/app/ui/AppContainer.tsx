import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

const AppContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div data-slot={"container"} className={`bg-background ${styles.container}`}>
            { children }
        </div>
    );
};

export default AppContainer;