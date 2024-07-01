"use client";

import React from "react";
import { RecoilRoot } from "recoil";

const StoreProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    );
};

export default StoreProvider;