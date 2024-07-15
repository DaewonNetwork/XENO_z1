"use client";

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import IconShared from "./IconShared";

import { useRouter } from "next/navigation";
import { MenuBarType } from "../types/MenuBar.type";

const MenuBarShared = ({ path, mutate, id, children }: MenuBarType) => {
    const router = useRouter();

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant={"light"} isIconOnly endContent={<IconShared iconType={"menu"} />} />
            </DropdownTrigger>
            <DropdownMenu>
                {children && children}
                <DropdownItem key={"2"} onClick={_ => router.push(path)}>
                    수정하기
                </DropdownItem>
                <DropdownItem onClick={_ => mutate(id)} key={"1"} className={"text-danger"} color={"danger"}>
                    삭제하기
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default MenuBarShared;