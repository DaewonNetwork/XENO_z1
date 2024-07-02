import { InputProps } from "@nextui-org/input";
import { FormType } from "./Form.type";

export interface FormInputType extends Omit<InputProps, "name">, FormType {
    
}