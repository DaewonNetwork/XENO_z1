import React, { ReactNode } from "react";

const TextSmallShared = ({ children }: { children: ReactNode }) => {
    return (
        <p data-slot={"text_small"} className={"text-small"}>{children}</p>
    );
};

export default TextSmallShared;