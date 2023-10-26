import Button from '../foundations/button'
import Header from '../foundations/header'
import Input from '../foundations/input'
import React, { ComponentProps } from 'react';
import Badge from'../foundations/badge'
import Block from'../foundations/block'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

function myFunction() {
  const popup = document.getElementById("myPopup");

  if (popup) {
    popup.classList.toggle("show");
  }
}
// export interface Machine {
//   MachineId: number; Name: string; Description: string; AccountId: number
// }

// export interface Account {
//   AccountId: number; Name: string; Password: string; Class: number
// }

function Tickets() {
  const [information, setInformation] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [pictures, setPictures] = useState('');
  const navigate = useNavigate();

  const upload = (file: File, onUploadProgress: any): Promise<any> => {
    let formData = new FormData();
  
    formData.append("file", file);
  
    return axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  };

  const getFiles = () : Promise<any> => {
    return axios.get("/files");
  };

  async function ChooseMachine() {
    const account = await fetch("http://localhost:5119/api/accounts").then((res) => res.json()).then(accounts => accounts.find((acc: any) => acc.accountId == 1))
    let machines = await fetch("http://localhost:5119/api/machines").then((res) => res.json()).then(machines => machines.filter((machine: any) => machine.accountId == account.accountId))
    console.log(machines)
  }

  async function handleSubmit() {
    if (information != null && phonenumber != null)
    {
      alert("Ticket submitted");
      navigate('/tickets');
    }
    else
    {
      alert("You haven't filled in all necessary fields");
    }
  }

  return (
    <><div className='flex-container'>
      {/* <Button onClick={ChooseMachine}>choose machine</Button> */}
      {/* <div><Header></Header></div> */}
      <div><label><h1>Report error</h1></label></div>
    </div><div className="flex-container">
        <div></div>
        <div><div>
          {/* <Button hierarchy='xl' intent="primary" onClick={myFunction} rounded="slight">Pop up<span className="popuptext" id="myPopup">Popup text...</span></Button> */}

          {/* <Block size = "xl" color = "gray"> <label><h2>What do you see?</h2></label></Block> */}
          <h2>What do you see?*</h2>
          <Input hierarchy='xxl' onChange={e => setInformation(e.currentTarget.value)}/>
          <h2>What should it do?</h2>
          <Input hierarchy='xxl'></Input>
        </div></div>
        <div><div>
          <h2>What have you tried?*</h2>
          <Input hierarchy='xxl'></Input>
          <h2>Enter phone number</h2>
          <Input hierarchy='xxl' onChange={e => setPhonenumber(e.currentTarget.value)}/>
        </div></div>
        <div><div>
          <h2>Upload videos/pictures</h2>
          <Input hierarchy='xxl' onChange={e => setPictures(e.currentTarget.value)}/><br></br><br></br>
          <Button hierarchy='xl' intent="primary" onClick={handleSubmit} rounded="slight">Submit</Button>
        </div></div>
      </div></>
  )
  }
export default Tickets