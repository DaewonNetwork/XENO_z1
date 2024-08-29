"use client"

import { useReviewHeaderRead } from "@/(FSD)/entities/review/api/useReviewHeaderRead";
import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppNav from "@/(FSD)/widgets/app/ui/AppNav";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";


interface ReviewHeaderType {
    name: string;
    color: string;
    productId: number;

}

const Layout = ({ children, }: { children: React.ReactNode }) => {

    const { orderId } = useParams<{ orderId: string }>();
    const { data, isError, isPending, refetch } = useReviewHeaderRead(Number(orderId));

    const reviewHeader: ReviewHeaderType = data;

    useEffect(() => {
        refetch();
    }, [orderId]);

    if (isError) return <></>;
    if (isPending) return <></>;


    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={`${reviewHeader.name} (${reviewHeader.color})`} />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <AppNav />
            </AppFixedBtmBar>
        </>
    );
};

export default Layout;