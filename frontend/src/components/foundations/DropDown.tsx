import React, { useEffect, useState } from 'react';

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

  /**
   * Handle passing the city name
   * back to the parent component
   *
   * @param machine  The selected city
   */
  const onClickHandler = (machine: string): void => {
    machineSelection(machine);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {machines.map(
          (machine: string, index: number): JSX.Element => {
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
          }
        )}
      </div>
    </>
  );
};

export default DropDown;
