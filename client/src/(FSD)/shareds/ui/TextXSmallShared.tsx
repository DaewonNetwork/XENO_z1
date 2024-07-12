import React from "react";
import { TextType } from "../types/Text.type";

const TextXSmallShared = ({ className = "", fontWeight = "normal", isLabel = false, htmlFor, children }: TextType) => {
    return (
        <p data-slot={"text_xsmall"} className={`${className} font-${fontWeight} text-xsmall`}>
            {!isLabel && <>{children}</>}
            {isLabel && <label htmlFor={htmlFor}>{children}</label>}
        </p>
    );
};

export default TextXSmallShared;