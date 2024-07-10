import React from "react";
import { TextType } from "../types/Text.type";

const TextXSmallShared = ({ className = "", fontWeight = "normal", children }: TextType) => {
    return (
        <p data-slot={"text_xsmall"} className={`${className} font-${fontWeight} text-xsmall`}>{children}</p>
    );
};

export default TextXSmallShared;