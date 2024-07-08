import React from "react";
import type { TextType } from "../types/Text.type";

const TextLargeShared = ({ className = "", children }: TextType) => {
    return (
        <h1 data-slot={"text_large"} className={`${className} text-large font-medium`}>{children}</h1>
    );
};

export default TextLargeShared;