"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/input";
import IconShared from "./IconShared";

const PasswordInputShared = ({ name, control, onChange, children, ...props }: any) => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Controller name={name} control={control} render={({ field }) => {
            const { onChange, onBlur, name, value } = field;

            return (
                <Input
                    {...props}
                    name={name}
                    value={value}
                    isRequired
                    isClearable
                    id={name}


                    onChange={(e: any) => {
                        onChange(e);
                    }}
                    onBlur={(_: any) => {
                        onBlur();
                    }}

                    type={isVisible ? "password" : "text"}
                    placeholder={children ? `${children}` : props.placeholder}

                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            <IconShared iconType={isVisible ? "eye" : "eye_active"} />
                        </button>
                    }
                />
            )
        }}
        />
    );
};

PasswordInputShared.displayName = "PasswordInput";
export default PasswordInputShared;