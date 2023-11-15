import Button from '../foundations/button'
import Header from '../foundations/header'
import Input from '../foundations/input'
import React, { ComponentProps, SetStateAction, useEffect, useRef } from 'react';
import Badge from'../foundations/badge'
import Block from'../foundations/block'
import UploadService from "../../services/FileUploadService";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import IFile from "../../services/File";
import DropDown from "../foundations/DropDown";
import Settings from '../foundations/settings'

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
  const navigate = useNavigate();
  const [machinenames, SetMachineNames] = useState<string[]>([""]);
  const [account, SetAccount] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<"string" | undefined>();

  class Machine {
    name: string;
    id: number;
    constructor(name: string, id: number)
    {
      this.name = name;
      this.id = id
    }
   }
   var allmachines: Machine[] = [];


  async function ChooseMachine()
  {
    let currentaccount = await fetch("http://localhost:5119/api/accounts")
    .then((res) => res.json())
    .then(accounts => accounts.find((acc: any) => acc.accountId == 3));

    let machinelist = await fetch("http://localhost:5119/api/machines")
    .then((res) => res.json())
    .then(machines => machines.filter((machine: any) => machine.accountId == currentaccount.accountId));
    for (var machine of machinelist)
    {
      allmachines.push(new Machine(machine.name, machine.machineId));
    }
    SetAccount(currentaccount.accountId);
    SetMachineNames((allmachines.map(x => x.name + ", Id: " + x.id)));
  }

  async function HandleOnChange(e: React.FormEvent<HTMLInputElement>){
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    setFile(target.files[0]);
    
    const file = new FileReader;

    file.onload = function() {
      console.log('file', file.result);
    }

    file.readAsDataURL(target.files[0])
  }

  async function handleSubmit() {

    if (typeof file == "undefined") return;
    const Pictures: { [key: string]: any } = {};

    Pictures['file'] = file;

    if (problem.length != 0 && phonenumber.length != 0 && mustbedoing.length != 0 && havetried.length != 0)
    {
      if (problem.length < 100 || mustbedoing.length < 100) {
        alert("The first 2 answers must contain atleast 90 characters")
        navigate('/tickets');
      }
      if (selectMachine == "")
      {
        alert("Please choose a machine");
        navigate('/tickets');
      }
      else
      {
        let information = {"Problem" : problem, "Must be doing": mustbedoing, "Have tried": havetried};
        var ticket = 
        {
          Machine_Id: selectMachine.split("Id: ")[1],
          Customer_Id: account,
          Priority: "unknown",
          Status: "To do",
          Date_Created: new Date(),
          Information: information,
          Solution: "x",
          Pictures: Pictures,
          PhoneNumber: phonenumber,
          Notes: ""
        }

        const pushticket = await axios.post('http://localhost:5119/api/tickets/', ticket)
        .then(res => 
            {console.log("Message successfully updated", res);})
        .catch(err => 
            {console.log("Message could not be updated", err.response || err.Message)});
        pushticket
        alert("Ticket submitted");
        navigate('/client');

      }
    }
    else
    {
      alert("You haven't filled in all necessary fields");
    }
  }


    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [selectMachine, setSelectMachine] = useState<string>("");
    const machines = () => {
      return machinenames;
    };
    /**
     * Toggle the drop down menu
     */
    const toggleDropDown = () => {
      setShowDropDown(!showDropDown);
      ChooseMachine();
    };
    /**
     * Hide the drop down menu if click occurs
     * outside of the drop-down element.
     *
     * @param event  The mouse event
     */
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
      if (event.currentTarget === event.target) {
        setShowDropDown(false);
      }
    };
  
    /**
     * Callback function to consume the
     * machine name from the child component
     *
     * @param machine  The selected machine
     */
    const machineSelection = (machine: string): void => {
      setSelectMachine(machine);
    };
  return (
    
    <div>
        <div className="announcement">
          <div>{"First, we have a few questions (fill in the first block):"}</div>
          <div>{"1. Is the machine turned on?"}</div>
          <div>{"2. Does the machine still move(for a part)?"}</div>
        </div>
        <button
          className={showDropDown ? "active" : undefined}
          onClick={(): void => toggleDropDown()}
          onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
            dismissHandler(e)
          }
        >
          <div>{selectMachine ? "Select: " + selectMachine : "Select ..."} </div>
          {showDropDown && (
            <DropDown
              machines={machines()}
              showDropDown={false}
              toggleDropDown={(): void => toggleDropDown()}
              machineSelection={machineSelection}
            />
          )}
        </button>
              {/* <Button onClick={ChooseMachine}>choose machine</Button> */}

      <div><Header></Header></div>
      ImagesUpload
      <div><label><h1>Report error</h1></label></div>
          {/* <Button hierarchy='xl' intent="primary" onClick={myFunction} rounded="slight">Pop up<span className="popuptext" id="myPopup">Popup text...</span></Button> */}

          {/* <Block size = "xl" color = "gray"> <label><h2>What do you see?</h2></label></Block> */}
        <h2>What do you see?* (Atleast 20 words)</h2>
        <Input hierarchy='xxl' onChange={e => setProblem(e.currentTarget.value)}/>

        <h2>What should it do?* (Atleast 20 words)</h2>
        <Input hierarchy='xxl'onChange={e => setMustBeDoing(e.currentTarget.value)}/>

        <h2>What have you tried?*</h2>
        <Input hierarchy='xxl'onChange={e => setHaveTried(e.currentTarget.value)}/>

        <h2>Enter phone number</h2>
        <div className="checkbox-wrapper-6">
        <input className="tgl tgl-light" id="cb1-6" type="checkbox"/>
        <label className="tgl-btn" htmlFor="cb1-6"></label><label>Use from account</label>
        </div>
        <Input hierarchy='xxl' onChange={e => setPhonenumber(e.currentTarget.value)}/>
      
          <h2>Upload videos/pictures</h2>
          <Settings></Settings>
          {/* <Input hierarchy='xxl' onChange={e => setPictures(e.currentTarget.value)}/><br></br><br></br> */}
          <input 
          type="file" 
          name="image" 
          accept="image/png, image/jpg"
          onChange={HandleOnChange}
          multiple
          /><br></br>

          <Button hierarchy='xl' intent="primary" onClick={handleSubmit} rounded="slight">Submit</Button>

          
      </div>
      

  )
  }
  
export default Tickets