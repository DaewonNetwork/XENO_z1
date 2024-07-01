import React from "react";
import QueryProvider from "./QueryProvider";
import UiProvider from "./UiProvider";
import StoreProvider from "./StoreProvider";

const RootProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <StoreProvider>
            <QueryProvider>
                <UiProvider>
                    {children}
                </UiProvider>
            </QueryProvider>
        </StoreProvider>
    );
};

export default RootProvider;