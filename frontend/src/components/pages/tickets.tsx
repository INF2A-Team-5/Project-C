import Button from '../foundations/button'
import Header from '../foundations/header'
import Input from '../foundations/input'
import React, { ComponentProps, useEffect } from 'react';
import Badge from'../foundations/badge'
import Block from'../foundations/block'
import UploadService from "../foundations/FileUploadService";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

// export interface Machine {
//   MachineId: number; Name: string; Description: string; AccountId: number
// }

// export interface Account {
//   AccountId: number; Name: string; Password: string; Class: number
// }

function Tickets() {
  const [problem, setProblem] = useState('');
  const [mustbedoing, setMustBeDoing] = useState('');
  const [havetried, setHaveTried] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [pictures, setPictures] = useState('');
  const navigate = useNavigate();

  const ImagesUpload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [imagePreviews, setImagePreviews] = useState<Array<string>>([]);
    const [progressInfos, setProgressInfos] = useState<Array<ProgressInfo>>([]);
    const [message, setMessage] = useState<Array<string>>([]);
    const [imageInfos, setImageInfos] = useState<Array<IFile>>([]);
    const progressInfosRef = useRef<any>(null);
  }

  // Hiermee aan het kutten, maar is nog niet gefixt 

  async function ChooseMachine() {
    const account = await fetch("http://localhost:5119/api/accounts").then((res) => res.json()).then(accounts => accounts.find((acc: any) => acc.accountId == 1))
    let machines = await fetch("http://localhost:5119/api/machines").then((res) => res.json()).then(machines => machines.filter((machine: any) => machine.accountId == account.accountId))
    console.log(machines)
  }

  async function handleSubmit() {
    if (problem.length != 0 && phonenumber.length != 0 && mustbedoing.length != 0 && havetried.length != 0) {
      if (problem.length < 100 || mustbedoing.length < 100) {
        alert("The first 2 answers must contain atleast 90 characters")
        navigate('/tickets');
      }
      else {
        let information = { "Problem": problem, "Must be doing": mustbedoing, "Have tried": havetried };
        var ticket =
        {
          Machine_Id: 1,
          Customer_Id: 1,
          Priority: "unknown",
          Status: "To do",
          Date_Created: new Date(),
          Information: information,
          Solution: "x",
          Pictures: "x",
          PhoneNumber: phonenumber,
          Notes: ""
        }

        const pushticket = axios.post("http://localhost:5119/api/tickets", ticket)
          .then(res => { console.log("Message successfully updated", res); })
          .catch(err => { console.log("Message could not be updated", err) });
        pushticket

        alert("Ticket submitted");
        navigate('/tickets');


      }
    }
    else {
      alert("You haven't filled in all necessary fields");
    }
  }


  async function Popup() {
    alert("First, we have a few questions (fill in the first block):'\n1. Is the machine turned on?\n2. Does the machine still move(for a part)?")
  }

  useEffect(() => {
    Popup(); // Call the Popup function when the component mounts
  }, []);

  return (

    <div>
      {/* <Button onClick={ChooseMachine}>choose machine</Button> */}
      {/* <div><Header></Header></div> */}
      <div><label><h1>Report error</h1></label></div>
      {/* <Button hierarchy='xl' intent="primary" onClick={myFunction} rounded="slight">Pop up<span className="popuptext" id="myPopup">Popup text...</span></Button> */}

      {/* <Block size = "xl" color = "gray"> <label><h2>What do you see?</h2></label></Block> */}
      <h2>What do you see?* (Atleast 20 words)</h2>
      <Input hierarchy='xxl' onChange={e => setProblem(e.currentTarget.value)} />

      <h2>What should it do?* (Atleast 20 words)</h2>
      <Input hierarchy='xxl' onChange={e => setMustBeDoing(e.currentTarget.value)} />

      <h2>What have you tried?*</h2>
      <Input hierarchy='xxl' onChange={e => setHaveTried(e.currentTarget.value)} />

      <h2>Enter phone number</h2>
      <div className="checkbox-wrapper-6">
        <input className="tgl tgl-light" id="cb1-6" type="checkbox" />
        <label className="tgl-btn" htmlFor="cb1-6"></label><label>Use from account</label>
        </div>
        <Input hierarchy='xxl' onChange={e => setPhonenumber(e.currentTarget.value)}/>
      
          <h2>Upload videos/pictures</h2>
          <Input hierarchy='xxl' onChange={e => setPictures(e.currentTarget.value)}/><br></br><br></br>
          <Button hierarchy='xl' intent="primary" onClick={handleSubmit} rounded="slight">Submit</Button>
      </div>
      <Input hierarchy='xxl' onChange={e => setPhonenumber(e.currentTarget.value)} />




      <h2>Upload videos/pictures</h2>
      <Input hierarchy='xxl' onChange={e => setPictures(e.currentTarget.value)} /><br></br><br></br>
      <Button hierarchy='xl' intent="primary" onClick={handleSubmit} rounded="slight">Submit</Button>
    </div>

  )
}
export default Tickets