"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";
import IconShared from "./IconShared";

const BackBtnShared = () => {
    const router = useRouter();
    
    return (
        <Button onClick={_ => router.back()} variant={"light"} isIconOnly endContent={<IconShared iconType={"left"} />} />
    )
}

export default BackBtnShared;