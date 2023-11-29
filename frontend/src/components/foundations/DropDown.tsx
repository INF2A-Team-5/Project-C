import React, { useEffect, useState } from "react";

type DropDownProps = {
  machines: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  machineSelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  machines,
  machineSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const onClickHandler = (machine: string): void => {
    machineSelection(machine);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? "dropdown" : "dropdown active"}>
        {machines.map((machine: string, index: number): JSX.Element => {
          return (
            <p
              key={index}
              onClick={(): void => {
                onClickHandler(machine);
              }}
            >
              {machine}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default DropDown;
