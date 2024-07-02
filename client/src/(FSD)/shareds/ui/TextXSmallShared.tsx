import React, { ReactNode } from "react";

const TextXSmallShared = ({ children }: { children: ReactNode }) => {
    return (
        <p data-slot={"text_xsmall"} className={"text-xsmall"}>{children}</p>
    );
};

export default TextXSmallShared;