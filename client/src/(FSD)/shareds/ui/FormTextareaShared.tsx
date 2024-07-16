"use client";

import { Controller } from "react-hook-form";
import { Textarea, TextAreaProps } from "@nextui-org/input";
import { FormType } from "../types/Form.type";

interface FormTextareaSharedProps extends Omit<TextAreaProps, "name">, FormType {};

const FormTextareaShared = ({ name, control, endContent, ...props }: FormTextareaSharedProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const { onChange, onBlur, name, value } = field;

                return (
                    <Textarea
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
                    />
                )
            }}
        />
    );
};

export default FormTextareaShared;