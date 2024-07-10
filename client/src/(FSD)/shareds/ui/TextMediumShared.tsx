import React from "react";
import type { TextType } from "../types/Text.type";

const TextMediumShared = ({ className = "", fontWeight = "medium", children }: TextType) => {
    return (
        <p data-slot={"text_medium"} className={`${className} font-${fontWeight} text-medium`}>{children}</p>
    );
};

export default TextMediumShared;