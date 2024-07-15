import type { UseMutateFunction } from "@tanstack/react-query";

export interface MenuBarType {
    path: string;
    id: number;
    mutate: UseMutateFunction<any, Error, number, unknown>;
    children?: any;
}