import React from "react";
import type { TextType } from "../types/Text.type";

const TextMediumShared = ({ className, children }: TextType) => {
    return (
        <p data-slot={"text_medium"} className={`${className} text-medium`}>{children}</p>
    );
};

export default TextMediumShared;