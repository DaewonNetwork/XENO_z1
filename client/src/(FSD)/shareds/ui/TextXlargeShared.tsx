import React from "react";
import type { TextType } from "../types/Text.type";

const TextXLargeShared = ({ className = "", fontWeight = "semibold", children, isLabel = false, htmlFor }: TextType) => {
    return (
        <h1 data-slot={"text_xlarge"} className={`${className} font-${fontWeight} text-xlarge`}>
            {!isLabel && <>{children}</>}
            {isLabel && <label htmlFor={htmlFor}>{children}</label>}
        </h1>
    );
};

export default TextXLargeShared;