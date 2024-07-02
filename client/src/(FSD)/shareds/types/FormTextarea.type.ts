import type { TextAreaProps } from "@nextui-org/input";
import type { FormType } from "./Form.type";

export interface FormTextareaType extends Omit<TextAreaProps, "name">, FormType {
    
}