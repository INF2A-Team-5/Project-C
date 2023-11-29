import React from "react";
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva("my-2 border-2 border-grey-500 outline-none outline-4 outline-transparent focus:outline-primary-500 dark:border-secondary-700", {
  variants: {
    hierarchy: {
      sm: "h-16 w-3/6 pl-5 pr-10 text-md",
      md: "h-16 w-3/6 px-10 text-2xl",
      lg: "h-16 w-4/5 px-10 text-2xl"
    },
    rounded: {
      none: "rounded-none",
      slight: "rounded-md",
      full: "rounded-full"
    }
  },
  defaultVariants: {
    hierarchy: "md",
    rounded: "slight"
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> { }

const Input = ({ hierarchy, rounded, ...props }: InputProps) => <input className={inputVariants({ hierarchy, rounded })} {...props} />

export default Input;
