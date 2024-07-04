"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";
import IconShared from "./IconShared";
import LinkBtnShared from "./LinkBtnShared";

interface BackBtnSharedType {
    href?: string;
}

const BackBtnShared = ({ href }: BackBtnSharedType) => {
    const router = useRouter();

    return (
        <>
            {(!href) && <Button size={"sm"} onClick={_ => router.back()} variant={"light"} isIconOnly endContent={<IconShared iconType={"left"} iconSize={"md"} />} />}
            {(href) && <LinkBtnShared href={href} size={"sm"} onClick={_ => router.back()} variant={"light"} isIconOnly endContent={<IconShared iconType={"left"} iconSize={"md"} />} />}
        </>
    )
}

export default BackBtnShared;