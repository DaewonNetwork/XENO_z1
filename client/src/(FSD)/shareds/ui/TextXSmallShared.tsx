import React, { ReactNode } from "react";
import { TextType } from "../types/Text.type";

const TextXSmallShared = ({ className = "", children }: TextType) => {
    return (
        <p data-slot={"text_xsmall"} className={`${className} text-xsmall`}>{children}</p>
    );
};

export default TextXSmallShared;