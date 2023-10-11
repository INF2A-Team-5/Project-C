import React from "react";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  hierarchy?: "sm" | "md" | "lg" | "xl";
  name?: "username" | "password";
}

const styles = {
  hierarchy: {
    sm: "input-sm",
    md: "input-md",
    lg: "input-lg",
    xl: "input-xl",
  },
};
//function Input({ hierarchy = "md", type="username", ...props }: InputProps) {
function Input({ hierarchy = "md",...props }: InputProps) {
  return (
    <input type="text" className={`${styles.hierarchy[hierarchy]}`} {...props}>
      {/* {children} */}
    </input>
  );
}

export default Input;
