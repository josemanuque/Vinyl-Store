import { ReactNode } from "react";

export interface FormProps<T extends Record<string, any>> {
    initialValues: T;
    onSubmit: (values: T) => void;
    children?: ReactNode;
}
