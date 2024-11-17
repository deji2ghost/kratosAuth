import { HTMLProps } from "react";

export interface InputProps extends HTMLProps<HTMLInputElement> {
   type?: "text" | "password";
   className?: string;
}
