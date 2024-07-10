"use client";

import useAuthStatus from "@/(FSD)/shareds/hooks/useAuthStatus";
import React, { useEffect } from "react";

const Layout = ({ children, }: { children: React.ReactNode; }) => {
    const {data , isPending } = useAuthStatus();

    useEffect(() => { }, [isPending]);

    console.log("루트",data)
    if (isPending) return <></>;

    return (
        <>
            {children}
        </>
    );
};

export default Layout;