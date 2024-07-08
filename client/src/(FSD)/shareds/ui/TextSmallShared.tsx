import React from "react";
import type { TextType } from "../types/Text.type";

const TextSmallShared = ({ className = "", children }: TextType) => {
    return (
        <p data-slot={"text_small"} className={`${className} text-small`}>{children}</p>
    );
};

export default TextSmallShared;