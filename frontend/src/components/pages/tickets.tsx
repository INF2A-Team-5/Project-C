import Button from '../foundations/button'
import Header from '../foundations/header'
import Input from '../foundations/input'
import React, { ComponentProps, SetStateAction, useEffect, useRef } from 'react';
import Badge from '../foundations/badge'
import Block from '../foundations/block'
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
  const [pictures, setPictures] = useState('');
  const navigate = useNavigate();
  const [machinenames, SetMachineNames] = useState<string[]>([""]);
  const [account, SetAccount] = useState('');
  class Machine {
    name: string;
    id: number;
    constructor(name: string, id: number) {
      this.name = name;
      this.id = id
    }
  }
  var allmachines: Machine[] = [];
  // async function uploadimages() {
  //   ImagesUpload
  // }

  // const ImagesUpload: React.FC = () => {
  //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  //   const [imagePreviews, setImagePreviews] = useState<Array<string>>([]);
  //   const [progressInfos, setProgressInfos] = useState<Array<ProgressInfo>>([]);
  //   const [message, setMessage] = useState<Array<string>>([]);
  //   const [imageInfos, setImageInfos] = useState<Array<IFile>>([]);
  //   const progressInfosRef = useRef<any>(null);

  //   const selectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     let images: Array<string> = [];
  //     let files = event.target.files;

  //     if (files) {
  //       for (let i = 0; i < files.length; i++) {
  //         images.push(URL.createObjectURL(files[i]));
  //       }

  //       setSelectedFiles(files);
  //       setImagePreviews(images);
  //       setProgressInfos([]);
  //       setMessage([]);
  //     }
  //   };
  //   const uploadImages = () => {
  //     if (selectedFiles != null) {
  //       const files = Array.from(selectedFiles);

  //       let _progressInfos = files.map((file) => ({
  //         percentage: 0,
  //         fileName: file.name
  //       }));

  //       progressInfosRef.current = _progressInfos;

  //       const uploadPromises = files.map((file, i) => upload(i, file));

  //       Promise.all(uploadPromises)
  //         .then(() => UploadService.getFiles())
  //         .then((images) => {
  //           setImageInfos(images.data);
  //         });

  //       setMessage([]);
  //     }
  //   };

  //   const upload = (idx: number, file: File) => {
  //     let _progressInfos = [...progressInfosRef.current];
  //     return UploadService.upload(file, (event: { loaded: number; total: number; }) => {
  //       _progressInfos[idx].percentage = Math.round(
  //         (100 * event.loaded) / event.total
  //       );
  //       setProgressInfos(_progressInfos);
  //     })
  //       .then(() => {
  //         setMessage((prevMessage) => [
  //           ...prevMessage,
  //           file.name + ": Successful!"
  //         ]);
  //       })
  //       .catch((err: any) => {
  //         _progressInfos[idx].percentage = 0;
  //         setProgressInfos(_progressInfos);

  //         let msg = file.name + ": Failed!";
  //         if (err.response && err.response.data && err.response.data.message) {
  //           msg += " " + err.response.data.message;
  //         }

  //         setMessage((prevMessage) => [
  //           ...prevMessage,
  //           msg
  //         ]);
  //       });
  //   };

  //   useEffect(() => {
  //     UploadService.getFiles().then((response) => {
  //       setImageInfos(response.data);
  //     });
  //   }, []);

  //   return (
  //     <div>
  //       {progressInfos &&
  //         progressInfos.length > 0 &&
  //         progressInfos.map((progressInfo: ProgressInfo, index: number) => (
  //           <div className="mb-2" key={index}>
  //             <span>{progressInfo.fileName}</span>
  //             <div className="progress">
  //               <div
  //                 className="progress-bar progress-bar-info"
  //                 role="progressbar"
  //                 aria-valuenow={progressInfo.percentage}
  //                 aria-valuemin={0}
  //                 aria-valuemax={100}
  //                 style={{ width: progressInfo.percentage + "%" }}
  //               >
  //                 {progressInfo.percentage}%
  //               </div>
  //             </div>
  //           </div>
  //         ))}

  //       <div className="row my-3">
  //         <div className="col-8">
  //           <label className="btn btn-default p-0">
  //             <input type="file" multiple accept="image/*" onChange={selectImages} />
  //           </label>
  //         </div>

  //         <div className="col-4">
  //           <button
  //             className="btn btn-success btn-sm"
  //             disabled={!selectedFiles}
  //             onClick={uploadImages}
  //           >
  //             Upload
  //           </button>
  //         </div>
  //       </div>

  //       {imagePreviews && (
  //         <div>
  //           {imagePreviews.map((img, i) => {
  //             return (
  //               <img className="preview" src={img} alt={"image-" + i} key={i} />
  //             );
  //           })}
  //         </div>
  //       )}

  //       {message.length > 0 && (
  //         <div className="alert alert-secondary mt-2" role="alert">
  //           <ul>
  //             {message.map((item, i) => {
  //               return <li key={i}>{item}</li>;
  //             })}
  //           </ul>
  //         </div>
  //       )}

  //       {imageInfos.length > 0 && (
  //         <div className="card mt-3">
  //           <div className="card-header">List of Images</div>
  //           <ul className="list-group list-group-flush">
  //             {imageInfos.map((img, index) => (
  //               <li className="list-group-item" key={index}>
  //                 <p>
  //                   <a href={img.url}>{img.name}</a>
  //                 </p>
  //                 <img src={img.url} alt={img.name} height="80px" />
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  // Hiermee aan het kutten, maar is nog niet gefixt 

  async function ChooseMachine() {
    let currentaccount = await fetch("http://localhost:5119/api/accounts")
      .then((res) => res.json())
      .then(accounts => accounts.find((acc: any) => acc.accountId == 3));

    let machinelist = await fetch("http://localhost:5119/api/machines")
      .then((res) => res.json())
      .then(machines => machines.filter((machine: any) => machine.accountId == currentaccount.accountId));
    for (var machine of machinelist) {
      allmachines.push(new Machine(machine.name, machine.machineId));
    }
    SetAccount(currentaccount.accountId);
    SetMachineNames((allmachines.map(x => x.name + ", Id: " + x.id)));
  }
  async function handleSubmit() {

    if (problem.length != 0 && phonenumber.length != 0 && mustbedoing.length != 0 && havetried.length != 0) {
      if (problem.length < 100 || mustbedoing.length < 100) {
        alert("The first 2 answers must contain atleast 90 characters")
        navigate('/tickets');
      }
      if (selectMachine == "") {
        alert("Please choose a machine");
        navigate('/tickets');
      }
      else {
        let information = { "Problem": problem, "Must be doing": mustbedoing, "Have tried": havetried };
        var ticket =
        {
          Machine_Id: selectMachine.split("Id: ")[1],
          Customer_Id: account,
          Priority: "unknown",
          Status: "Open",
          Date_Created: new Date(),
          Information: information,
          Solution: "x",
          Pictures: "x",
          PhoneNumber: phonenumber,
          Notes: ""
        }

        const pushticket = await axios.post('http://localhost:5119/api/tickets/', ticket)
          .then(res => { console.log("Message successfully updated", res); })
          .catch(err => { console.log("Message could not be updated", err) });
        pushticket
        alert("Ticket submitted");
        navigate('/client');

      }
    }
    else {
      alert("You haven't filled in all necessary fields");
    }
  }


  // async function Popup() 
  // {
  //   alert("First, we have a few questions (fill in the first block):'\n1. Is the machine turned on?\n2. Does the machine still move(for a part)?")
  // }

  // useEffect(() => {
  //   Popup(); // Call the Popup function when the component mounts
  // }, []);
  // useEffect(() => {
  //   uploadimages(); // Call the Popup function when the component mounts
  // }, []);
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
      <Input hierarchy='xxl' onChange={e => setPhonenumber(e.currentTarget.value)} />

      <h2>Upload videos/pictures</h2>
      <Settings></Settings>
      <Input hierarchy='xxl' onChange={e => setPictures(e.currentTarget.value)} /><br></br><br></br>
      <Button hierarchy='xl' intent="primary" onClick={handleSubmit} rounded="slight">Submit</Button>
    </div>


  )
}

export default Tickets