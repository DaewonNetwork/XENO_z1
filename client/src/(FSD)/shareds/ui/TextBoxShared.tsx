import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

const TextBoxShared = ({ children, isBgColor = false }: { children: ReactNode; isBgColor?: boolean }) => {
    return (
        <div data-slot={"text_box"} className={`${isBgColor ? "bg-content3 rounded-small" : ""} ${styles.text_box}`}>
            {children}
        </div>
    )
}

export default TextBoxShared;