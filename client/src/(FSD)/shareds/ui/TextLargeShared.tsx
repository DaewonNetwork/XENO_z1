import React from "react";
import type { TextType } from "../types/Text.type";

const TextLargeShared = ({ className = "", fontWeight = "semibold", children, isLabel = false, htmlFor }: TextType) => {
    return (
        <h1 data-slot={"text_large"} className={`${className} font-${fontWeight} text-large`}>
            {!isLabel && <>{children}</>}
            {isLabel && <label htmlFor={htmlFor}>{children}</label>}
        </h1>
    );
};

export default TextLargeShared;