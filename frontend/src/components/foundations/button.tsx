import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "primary" | "secondary" | "tertiary" | "destructive";
  rounded?: "none" | "slight" | "full";
  hierarchy?: "sm" | "md" | "lg" | "xl";
}

const styles = {
  rounded: {
    full: "rounded-full",
    slight: "rounded-md",
    none: "rounded-none",
  },
  hierarchy: {
    sm: "h-16 w-16 font-medium text-sm", //square
    md: "h-8 w-32 font-medium text-sm",
    lg: "h-12 w-80 font-medium text-base",
    xl: "h-16 w-full font-semibold text-xl",
  },
};

function Button({ hierarchy = "md", type = "secondary", rounded = "none" ,children, ...props }: ButtonProps) {
  let buttonType = "";
  let buttonSize = "";

  switch (type) {
    case 'primary':
      buttonType = "text-white bg-primary-400 hover:bg-primary-600 dark:text-black dark:bg-primary-500 dark:hover:bg-primary-700"
      break;
    case 'secondary':
      buttonType = "text-white bg-grey-400 hover:bg-grey-600 dark:text-black dark:bg-grey-500 dark:hover:bg-grey-700"
      break;
    case 'tertiary':
    buttonType = "text-white bg-transparent dark:text-black"
    break;
    case 'destructive':
    buttonType = "text-white bg-destructive-500 hover:bg-destructive-600 dark:text-black dark:bg-destructive-800 dark:hover:bg-destructive-900"
    break;
  }
  return (
    <button className={`${styles.hierarchy[hierarchy]} ${buttonType} ${styles.rounded[rounded]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
