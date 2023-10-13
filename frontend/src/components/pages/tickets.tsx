import Button from '../foundations/button'
import Header from '../foundations/header'
import Input from '../foundations/input'
import React, { ComponentProps } from 'react';
import Badge from'../foundations/badge'
import Block from'../foundations/block'

function myFunction() {
  const popup = document.getElementById("myPopup");

  if (popup) {
    popup.classList.toggle("show");
  }
}


function Tickets() {

  return (
    
  <><div className='top'>
    {/* <Header></Header> */}
    <label><h1>Report error</h1></label>
    </div>
  <div className='left'>
      {/* <Button hierarchy='xl' intent="primary" onClick={myFunction} rounded="slight">Pop up<span className="popuptext" id="myPopup">Popup text...</span></Button> */}

      {/* <Block size = "xl" color = "gray"> <label><h2>What do you see?</h2></label></Block> */}
      <h2>What do you see?</h2>
      <Input hierarchy='xxl'></Input>
      <h2>What should it do?</h2>
      <Input hierarchy='xxl'></Input>
    </div>
    
    <div className="mid">
      <h2>What have you tried?</h2>
      <Input hierarchy='xxl'></Input>
      <h2>Enter phone number</h2>
      <Input hierarchy='xxl'></Input>
      </div>
      
      <div className="right">
      <h2>Upload videos/pictures</h2>
      <Input hierarchy='xxl'></Input>  
      </div></>
  )
}
export default Tickets
//export default Tickets