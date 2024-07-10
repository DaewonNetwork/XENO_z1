import React from "react";
import type { TextType } from "../types/Text.type";

const TextSmallShared = ({ className = "", fontWeight = "normal", children }: TextType) => {
    return (
        <p data-slot={"text_small"} className={`${className} font-${fontWeight} text-small`}>{children}</p>
    );
};

export default TextSmallShared;