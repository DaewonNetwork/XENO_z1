import React from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";
import type { TextType } from "../types/Text.type";

interface TextBoxType extends TextType {
    isBgColor?: boolean;
};

const TextBoxShared = ({ children, className = "", isBgColor = false }: TextBoxType) => {
    return (
        <div data-slot={"text_box"} className={`${className} ${isBgColor ? "bg-content3 rounded-small" : ""} ${styles.text_box}`}>
            {children}
        </div>
    )
}

export default TextBoxShared;