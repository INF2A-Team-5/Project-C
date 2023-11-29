import React from "react";

interface InputProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  hierarchy?: "md" | "lg";
  rounded?: "none" | "slight" | "full";
}

const styles = {
  hierarchy: {
    md: "w-4/5 h-20",
    lg: "w-4/5 h-36",
  },
  rounded: {
    full: "rounded-full",
    slight: "rounded-md",
    none: "rounded-none",
  },
};
function Textbox({
  hierarchy = "md",
  rounded = "slight",
  ...props
}: InputProps) {
  let border =
    "px-4 py-2 my-2 border-2 border-grey-500 outline-none outline-4 outline-transparent focus:outline-primary-500 dark:border-secondary-700 resize-none overflow-auto custom-scrollbar";
  return (
    <textarea
      className={`${border} ${styles.rounded[rounded]} ${styles.hierarchy[hierarchy]}`}
      {...props}
    ></textarea>
  );
}

export default Textbox;
