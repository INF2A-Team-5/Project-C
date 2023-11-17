import React from "react";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  hierarchy?: "md" | "lg";
  rounded?: "none" | "slight" | "full";
  name?: "username" | "password";
}

const styles = {
  hierarchy: {
    md: "h-16 w-3/6 px-10 text-2xl",
    lg: "h-16 w-4/5 px-10 text-2xl",
  },
  rounded: {
    full: "rounded-full",
    slight: "rounded-md",
    none: "rounded-none",
  },
  name: {
    username: "username",
    password: "password",
  },
};
function Input({ hierarchy = "md", rounded="slight", name = "username",...props }: InputProps) {
  let border = "my-2 border-2 border-grey-500 outline-none outline-4 outline-transparent focus:outline-primary-500 dark:border-secondary-700";
  return (
    <input type={`${styles.name[name]}`} className={`${border} ${styles.rounded[rounded]} ${styles.hierarchy[hierarchy]}`} {...props}>
    </input>
  );
}

export default Input;
