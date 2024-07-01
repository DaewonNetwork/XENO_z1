import React from "react";
import { Button } from "@nextui-org/button";
import { LinkBtnType } from "../types/LinkBtn.type";
import Link from "next/link";

const LinkBtnShared = ({ href, children, variant, ...props } : LinkBtnType) => {
    return (
        <Button variant={variant || "light"} data-slot={"link"} href={href} as={Link} {...props}>{ children }</Button>
    );
};

export default LinkBtnShared;