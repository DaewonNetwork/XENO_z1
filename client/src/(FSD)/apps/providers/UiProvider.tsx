"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";

const UiProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <NextUIProvider>
            <ThemeProvider defaultTheme={"light"}>
                {children}
            </ThemeProvider>
        </NextUIProvider>
    );
};

export default UiProvider;