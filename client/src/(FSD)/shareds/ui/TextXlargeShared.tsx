import React from "react";
import type { TextType } from "../types/Text.type";

const TextXLargeShared = ({ className = "", fontWeight = "bold", children }: TextType) => {
    return (
        <h1 data-slot={"text_xlarge"} className={`${className} font-${fontWeight} text-xlarge`}>{children}</h1>
    );
};

export default TextXLargeShared;