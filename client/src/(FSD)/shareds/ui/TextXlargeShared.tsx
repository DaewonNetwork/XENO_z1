import React from "react";
import type { TextType } from "../types/Text.type";

const TextXLargeShared = ({ className = "", children }: TextType) => {
    return (
        <h1 data-slot={"text_xlarge"} className={`${className} text-xlarge font-semibold`}>{children}</h1>
    );
};

export default TextXLargeShared;