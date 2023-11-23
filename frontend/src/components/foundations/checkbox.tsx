import React, { useState } from 'react';

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement>{
    checked: boolean;
    onChange: () => void;
  }
    

function Checkbox({ checked, onChange }: CheckboxProps): JSX.Element {
    return (
        <div className="items-top flex space-x-2">
            <input type="checkbox" checked={checked} onChange={onChange} />
        </div>
    );
}
  

export default Checkbox