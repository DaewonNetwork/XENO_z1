"use client";

import { Controller } from "react-hook-form";
import { Input, InputProps } from "@nextui-org/input";
import IconShared from "./IconShared";
import { FormType } from "../types/Form.type";

interface FormInputProps extends Omit<InputProps, "name">, FormType {
}

const FormInputShared = ({ name, control, endContent, startContent,  radius, ...props }: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const { onChange, onBlur, name, value } = field;

                return (
                    <Input
                        {...props}
                        name={name}
                        value={value}
                        isRequired
                        id={name}
                   

                        onChange={(e: any) => {
                            onChange(e);

                            if (props.onChange) {
                                props.onChange(e);
                            }
                        }}
                        onBlur={(_: any) => {
                            onBlur();
                        }}

                        startContent={startContent && startContent}

                        endContent={
                           endContent ? endContent :
                                <button className={"focus:outline-none"} type={"button"} onClick={() => { onChange(""); }}>
                                    <IconShared iconType={"close"} />
                                </button>
                        }
                    />
                )
            }}
        />
    );
};

export default FormInputShared;