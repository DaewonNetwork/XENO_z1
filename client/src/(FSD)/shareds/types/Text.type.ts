import type { ReactNode } from "react";

export interface TextType {
    children: ReactNode;
    className?: string;
    fontWeight?: "medium" | "normal" | "semibold" |  "bold";
    isLabel?: boolean;
    htmlFor?: string;
}