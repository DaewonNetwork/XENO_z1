"use client";

import useAuthStatus from "@/(FSD)/shareds/hooks/useAuthStatus";
import React, { useEffect } from "react";

const Layout = ({ children, }: { children: React.ReactNode; }) => {
    const { isPending } = useAuthStatus();

    useEffect(() => { }, [isPending]);

    if (isPending) return <></>;

    return (
        <>
            {children}
        </>
    );
};

export default Layout;