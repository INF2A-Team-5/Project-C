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
    sm: "h-16 w-16 px-4 font-medium text-sm",
    md: "h-8 w-32 px-4 font-medium text-sm",
    lg: "h-12 w-80 px-8 font-medium text-base",
    xl: "h-16 w-96 px-16 font-semibold text-2xl",
  },
};

function Button({ hierarchy = "md", type = "tertiary", rounded = "slight" ,children, ...props }: ButtonProps) {
  let buttonType = "";
  switch (type) {
    case 'primary':
      buttonType = "text-white bg-primary-400 hover:bg-primary-600 dark:text-dark-500 dark:bg-primary-500 dark:hover:bg-primary-700"
      break;
    case 'secondary':
      buttonType = "text-white bg-grey-400 hover:bg-grey-600 dark:text-black dark:bg-grey-500 dark:hover:bg-grey-700"
      break;
    case 'tertiary':
    buttonType = "text-dark-500 bg-transparent hover:bg-grey-200 dark:text-white dark:hover:bg-dark-900"
    break;
    case 'destructive':
    buttonType = "text-white bg-destructive-500 hover:bg-destructive-600 dark:text-dark-500 dark:bg-destructive-800 dark:hover:bg-destructive-900"
    break;
  }
  return (
    <button className={`${styles.hierarchy[hierarchy]} ${buttonType} ${styles.rounded[rounded]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
