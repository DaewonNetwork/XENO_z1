import React, { ReactNode } from "react";

const TextMediumShared = ({ children }: { children: ReactNode }) => {
    return (
        <p data-slot={"text_medium"} className={"text-medium"}>{children}</p>
    );
};

export default TextMediumShared;