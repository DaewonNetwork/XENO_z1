import React from "react";
import type { TextType } from "../types/Text.type";

const TextMediumShared = ({ className = "", fontWeight = "medium", children, isLabel = false, htmlFor }: TextType) => {
    return (
        <p data-slot={"text_medium"} className={`${className} font-${fontWeight} text-medium`}>
            {!isLabel && <>{children}</>}
            {isLabel && <label htmlFor={htmlFor}>{children}</label>}
        </p>
    );
};

export default TextMediumShared;