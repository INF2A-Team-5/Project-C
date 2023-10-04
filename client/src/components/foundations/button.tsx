interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "secondary" | "tertiary";
  rounded?: "full";
  hierarchy?: "sm" | "md" | "lg" | "xl";
}

const styles = {
  intent: {
    primary: "button-primary",
    secondary: "button-secondary",
    tertiary: "button-tertiary",
  },
  hierarchy: {
    sm: "button-sm",
    md: "button-md",
    lg: "button-lg",
    xl: "button-xl",
  },
};

function Button({ hierarchy = "md", intent = "secondary", children, ...props }: ButtonProps) {
  return (
    <button className={`${styles.hierarchy[hierarchy]} ${styles.intent[intent]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
