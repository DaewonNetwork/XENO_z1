import React, { ReactNode } from "react";

const TextXLargeShared = ({ children }: { children: ReactNode }) => {
    return (
        <h1 data-slot={"text_xlarge"} className={"text-xlarge font-semibold"}>{children}</h1>
    );
};

export default TextXLargeShared;