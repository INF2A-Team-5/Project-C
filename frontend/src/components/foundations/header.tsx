import React from 'react';

function Header() {
  return (
    <div className='relative flex items-center justify-center h-24 p-0 m-0 w-52 -top-4'>
      <img className='w-auto h-16 pr-5' src="src/images/viscon_logo_transparant.png" alt="Viscon Logo"/>
      <h1 className='text-6xl font-medium'>VISCON</h1>
    </div>    
  );
}

export default Header;