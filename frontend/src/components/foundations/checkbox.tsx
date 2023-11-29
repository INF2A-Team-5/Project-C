import React, { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: () => void;
}

function Checkbox({ checked, onChange }: CheckboxProps): JSX.Element {
  return (
    <div className="flex relative">
      <input
        className="transparent z-10 mr-4 w-8 h-8 appearance-none border-2 border-primary-500 rounded-xl"
        id="checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        placeholder=""
      />
      <div className="">
        <CheckIcon
          style={{ backgroundColor: "transparent" }}
          color="hsl(221.2 83.2% 50%)"
          className="check-1 opacity-0 absolute top-2 left-2 scale-[2]"
        />
      </div>
    </div>
  );
}

export default Checkbox;
