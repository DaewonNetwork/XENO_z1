import React from "react";
import type { TextType } from "../types/Text.type";

const TextLargeShared = ({ className = "", fontWeight = "semibold", children }: TextType) => {
    return (
        <h1 data-slot={"text_large"} className={`${className} font-${fontWeight} text-large`}>{children}</h1>
    );
};

export default TextLargeShared;