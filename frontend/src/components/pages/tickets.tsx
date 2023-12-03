import Button from '../foundations/button'
import Header from '../foundations/header'
import Input from '../foundations/input'
import React, { ComponentProps, SetStateAction, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';


// import UploadService from "../../services/FileUploadService";

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";

// import axios from 'axios';
import DropDown from "../foundations/DropDown";
import Settings from '../foundations/settings'
import Textbox from '../foundations/textbox';
import Checkbox from '../foundations/checkbox';

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
  // const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<(string | ArrayBuffer)[]>([]);
  const [isChecked, setChecked] = useState<boolean>(false);
  const handleCheckbox = () => {
    setChecked(!isChecked);
  }
  class Machine {
    name: string;
    machineId: number;
    constructor(name: string, machineId: number) {
      this.name = name;
      this.machineId = machineId
    }
  }

  

  async function ChooseMachine()
  {
    let currentaccount = await fetch("http://localhost:5119/api/accounts/" + localStorage.getItem("Id"),
    {
      method: "GET",
      headers: {
        "Authorization": "bearer " + localStorage.getItem("Token"),
        "Content-Type": "application/json",
      }
    }).then(data => data.json());

    if (currentaccount.phoneNumber != null) // PAS LATER AAN
    {
      setPhonenumber(currentaccount.phoneNumber);
    }

    let machinelist = await fetch("http://localhost:5119/GetMachinesPerAccount?accountId=" + localStorage.getItem("Id"),
    {
      method: "GET",
      headers:
      {
        "Authorization": "bearer " + localStorage.getItem("Token"),
      }
    })
    .then(data => data.json());
    SetAccount(currentaccount.accountId);
    SetMachineNames((machinelist.map((machine: Machine) => machine.name + ", Id: " + machine.machineId)));
  }

  async function HandleOnChange(e: React.ChangeEvent<HTMLInputElement>){
    // const target = e.target as HTMLInputElement & {
    //   files: FileList;
    // }
    const fileList = e.target.files

    if (fileList) {
      const allPreviews: (string | ArrayBuffer)[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (result) {
            allPreviews.push(result);
            // console.log(allPreviews);
            // You may want to set a state or perform other actions with 'result' here
            setPreview(allPreviews);
          }
          };
        reader.readAsDataURL(file);
      }
    }
  }

  async function handleSubmit() {
    if (phonenumber == "")
    {
      alert("Please enter a phone number");
      navigate("/tickets");
    }
    if (problem.length != 0  && mustbedoing.length != 0 && havetried.length != 0)
    {
      if (problem.split(" ").length < 20 || mustbedoing.split(" ").length < 20) {
        alert("The first 2 answers must contain at least 20 words")
        navigate('/tickets');
      }
      else if (selectMachine == "")
      {
        alert("Please choose a machine");
        navigate('/tickets');
      }
      if (phonenumber == "" || phonenumber == null)
      {
        alert("Please enter a phone number");
        navigate("/tickets");
      }

      else {

        var currentticket =
        {
          Machine_Id: selectMachine.split("Id: ")[1],
          Customer_Id: account,
          Priority: "unknown",
          Status: "Open",
          Date_Created: new Date(),

          Problem: problem,
          MustBeDoing: mustbedoing,
          HaveTried: havetried,

          Solution: "x",
          files: preview,
          phoneNumber: phonenumber,
          Notes: ""
        }

        // await axios.post('http://localhost:5119/api/tickets/', currentticket)
        // .then(res =>
        //     {console.log("Message successfully updated", res);})
        // .catch(err =>
        //     {console.log("Message could not be updated", err)});

        await fetch("http://localhost:5119/api/tickets/",
        {
          method: "POST",
          headers:
          {
            "Authorization": "bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentticket)
        })
        .then(res =>
            {console.log("Message successfully updated", res);})
        .catch(err =>
            {console.log("Message could not be updated", err)});

        alert("Ticket submitted");
        navigate('/client');

      // reader.readAsDataURL(file);
      }
    }
    else {
      alert("You haven't filled in all necessary fields");
    }
  }

    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [selectMachine, setSelectMachine] = useState<string>("");

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

    <div className='text-left pl-24'>        
      <Settings></Settings>
      <div className='flex justify-center pb-16 pt-10'>
        <Header></Header>
      </div>
      <div className='pb-8'>
        <h1 className='text-4xl font-medium'>Report error</h1>
        <p className='text-lg text-grey-900 font-medium'>Give details of the error and we will try to help you as soon as possible</p>
      </div>
      <div className='pb-16'>
        <h2 className='text-lg font-medium'>Select the machine related to the ticket</h2>
        <Button
          type="primary"
          hierarchy='lg'
          // className={showDropDown ? "active" : undefined}
          onClick={(): void => toggleDropDown()}
          onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
            dismissHandler(e)}>
          <ChevronDownIcon style={{backgroundColor:"transparent"}} className='relative left-10 top-3 scale-[2]' />
          {selectMachine ? "Select: " + selectMachine : "Select Machine"} 
          {showDropDown && (
            <DropDown
              machines={machinenames}
              showDropDown={false}
              toggleDropDown={(): void => toggleDropDown()}
              machineSelection={machineSelection}/>
          )}
        </Button>
      </div>
      <div className='pb-16'>
        <h2 className='text-lg font-medium'>What do you see?*</h2>
        <Textbox placeholder='shit broken' hierarchy='lg' onChange={e => setProblem(e.currentTarget.value)}></Textbox>
        <p className='text-md text-grey-900 '>Give us a detailed description on any visible defects (Atleast 20 words)</p>
      </div>
      <div className='pb-16'>
        <h2 className='text-lg font-medium'>What should it do?*</h2>
        <Textbox placeholder='work' hierarchy='lg' onChange={e => setMustBeDoing(e.currentTarget.value)}></Textbox>
        <p className='text-md text-grey-900 '>Give us a detailed description on what the machine should do (Atleast 20 words)</p>
      </div>
      <div className='pb-16'>
        <h2 className='text-lg font-medium'>What have you tried?*</h2>
        <Textbox placeholder='hit with hammer' hierarchy='lg' onChange={e => setHaveTried(e.currentTarget.value)}></Textbox>
        <p className='text-md text-grey-900 '>Describe all things you have done to try fixing the machine</p>
      </div>
      <div className='pb-16'>
        <div className='flex'>
          <Checkbox checked={isChecked} onChange={handleCheckbox} />
          <p className='text-lg font-medium'>Use other phone Number</p>
        </div>
        {isChecked ? 
          <><Input hierarchy='sm' placeholder='Enter phone number' onChange={e => setPhonenumber(e.currentTarget.value)} /></>
        : null}
      </div>
      <div className='pb-16'>
        <h2>Upload videos/pictures</h2>
        <Settings></Settings>
        <input
        type="file"
        name="image"
        accept="image/png, image/jpg"
        onChange={HandleOnChange}
        multiple
        /><br></br>
        {preview.map((previewItem, index) => (
        <img key={index} src={previewItem as string} alt={`Preview ${index}`} />
        ))}
      </div>
      {/* <div className='pb-16'>
        <h2>Upload videos/pictures</h2>
        <Input hierarchy='lg' onChange={e => setPictures(e.currentTarget.value)}/><br></br><br></br>
        <Button hierarchy='xl' type="primary" onClick={handleSubmit} rounded="slight">Submit</Button>
      </div> */}
      <Button hierarchy='xl' type="primary" onClick={handleSubmit} rounded="slight">Submit</Button>    
      <div className='py-5'></div>    
    </div>

  )
}

export default Tickets