import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "secondary" | "tertiary";
  rounded?: "none" | "slight" | "full";
  hierarchy?: "sm" | "md" | "lg" | "xl";
}

const styles = {
  intent: {
    primary: "button-primary",
    secondary: "button-secondary",
    tertiary: "button-tertiary",
  },
  rounded: {
    full: "button-rounded-full",
    slight: "button-rounded-slight",
    none: "button-rounded-none",
  },
  hierarchy: {
    sm: "button-sm",
    md: "button-md",
    lg: "button-lg",
    xl: "button-xl",
  },
};

function Button({ hierarchy = "md", intent = "secondary", rounded = "none" ,children, ...props }: ButtonProps) {
  return (
    <button className={`${styles.hierarchy[hierarchy]} ${styles.intent[intent]} ${styles.rounded[rounded]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
