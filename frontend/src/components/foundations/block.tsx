import React from 'react';

type BlockProps = {
    children: React.ReactNode;
    color?: "primary" | "gray";
    size?: "sm" | "md" | "lg" | "xl";
    rounded?: "full";
  };

  const styles = {
    color: {
        primary: "block-primary",
        gray: "block-gray",
    },
    size: {
      sm: "block-sm",
      md: "block-md",
      lg: "block-lg",
      xl: "block-xl",
    },
  };

  function Block({ size = "md", color = "primary", children }: BlockProps) 
{
    return (
        <span className={`${styles.color[color]} ${styles.size[size]}`}>
        {children}
      </span>
    );
}

export default Block;