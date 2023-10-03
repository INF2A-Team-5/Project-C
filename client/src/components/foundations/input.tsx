interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  hierarchy?: "sm" | "md" | "lg" | "xl";
}

const styles = {
  hierarchy: {
    sm: "input-sm",
    md: "input-md",
    lg: "input-lg",
    xl: "input-xl",
  },
};

function Input({ hierarchy = "md", children, ...props }: InputProps) {
  return (
    <input className={`${styles.hierarchy[hierarchy]}`} {...props}>
      {children}
    </input>
  );
}

export default Input;
