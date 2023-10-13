import Button from '../foundations/button'
import Header from '../foundations/header'
import Input from '../foundations/input'
import React, { ComponentProps } from 'react';
import Badge from'../foundations/badge'

function myFunction() {
  const popup = document.getElementById("myPopup");

  if (popup) {
    popup.classList.toggle("show");
  }
}


function Tickets() {

  return (
  <div>
    <Button hierarchy='xl' intent="primary" onClick={myFunction} rounded="slight">Pop up<span className="popuptext" id="myPopup">Popup text...</span></Button>
    
  </div>
  )
}
export default Tickets
//export default Tickets