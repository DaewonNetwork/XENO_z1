import React from "react";
import type { TextType } from "../types/Text.type";

const TextSmallShared = ({ className = "", fontWeight = "normal", children, isLabel = false, htmlFor }: TextType) => {
    return (
        <p data-slot={"text_small"} className={`${className} font-${fontWeight} text-small`}>
            {!isLabel && <>{children}</>}
            {isLabel && <label htmlFor={htmlFor}>{children}</label>}
        </p>
    );
};

export default TextSmallShared;