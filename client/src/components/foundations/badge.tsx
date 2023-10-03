type BadgeProps = {
  children: React.ReactNode;
  color?: "primary" | "gray" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "full";
};

const styles = {
  color: {
    primary: "badge-primary",
    gray: "badge-gray",
    success: "badge-success",
    warning: "badge-warning",
    danger: "badge-danger",
  },
  size: {
    sm: "button-sm",
    md: "button-md",
    lg: "button-lg",
    xl: "button-xl",
  },
};

function Badge({ size = "md", color = "gray", children }: BadgeProps) {
  return (
    <span className={`${styles.color[color]} ${styles.size[size]}`}>
      {children}
      {color}
    </span>
  );
}

export default Badge;
