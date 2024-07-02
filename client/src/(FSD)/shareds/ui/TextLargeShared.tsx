import React, { ReactNode } from "react";

const TextLargeShared = ({ children }: { children: ReactNode }) => {
    return (
        <h1 data-slot={"text_large"} className={"text-large font-medium"}>{children}</h1>
    );
};

export default TextLargeShared;