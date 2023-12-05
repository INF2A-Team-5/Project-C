import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Settings from "../foundations/settings";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Textarea, TextareaHint } from "../ui/textarea";
import { Input } from "../ui/input";
import Header from "../foundations/header";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function EditTicket() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [preview, setPreview] = useState<(string | ArrayBuffer)[]>([]);
  const [ticketInfo, setTicketInfo] = useState<any>(null);
  const ticketid = localStorage.getItem("currentticket");
  const [showTicketInfo, setShowTicketInfo] = useState(false);

  async function HandleCancel() {
    navigate(-1);
  }

  async function HandleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

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
  async function GetTicket() {
    let currentticket = await fetch(
      "http://localhost:5119/api/tickets/" + ticketid,
      {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
    console.log(currentticket);
    return currentticket;
  }

  async function ShowTicket() {
    const currentticket = await GetTicket();
    setShowTicketInfo(true);
    setTicketInfo(currentticket);
  }

  async function HandleSubmit() {
    const currentticket = await GetTicket();
    const ticket = {
      TicketId: currentticket.ticketId,
      Machine_Id: currentticket.machine_Id,
      Customer_Id: currentticket.customer_Id,
      Assigned_Id: currentticket.assigned_Id,
      Priority: currentticket.priority,
      Status: currentticket.status,

      Problem: currentticket.problem,
      HaveTried: currentticket.haveTried,
      MustBeDoing: currentticket.mustBeDoing,
      Date_Created: currentticket.date_Created,

      Solution: currentticket.solution,
      PhoneNumber: currentticket.phoneNumber,
      Notes: currentticket.notes ? [...currentticket.notes, notes] : [notes],
      files: currentticket.files
        ? [...currentticket.files, ...preview]
        : [...preview],
    };

    try {
      const response = await fetch(
        "http://localhost:5119/api/tickets/" + ticketid,
        {
          method: "PUT",
          headers: {
            Authorization: "bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticket),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.text(); // Capture response content
        throw new Error(
          `HTTP error! Status: ${
            response.status
          }. Error message: ${JSON.stringify(errorResponse)}`
        );
      }
      alert("Ticket updated");
      navigate(-1);
      // If needed, you can handle the response data here
    } catch (error) {
      console.error("Error during PUT request:", error);
    }
  }

  async function CloseTicket() {
    let currentticket = await fetch(
      "http://localhost:5119/api/tickets/" + ticketid,
      {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
    currentticket.status = "Closed";
    try {
      const response = await fetch(
        "http://localhost:5119/api/tickets/" + ticketid,
        {
          method: "PUT",
          headers: {
            Authorization: "bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentticket),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.text(); // Capture response content
        throw new Error(
          `HTTP error! Status: ${
            response.status
          }. Error message: ${JSON.stringify(errorResponse)}`
        );
      }
      alert("Ticket closed");
      navigate(-1);
      // If needed, you can handle the response data here
    } catch (error) {
      console.error("Error during PUT request:", error);
    }
  }

  return (
    <div className="text-left px-24">
      <Settings></Settings>
      <div className="flex justify-center pb-16 pt-10">
        <Header></Header>
      </div>
      <div className="grid gap-12">
        <div className="">
          {/* <h1 className='text-4xl font-medium'>{t('editticket.header')}</h1> */}
          <h1 className="text-4xl font-medium">Your ticket</h1>
          <Label>View and edit ticket</Label>
          <Separator className="my-4"/>
          <br />
          <Button variant="outline" onClick={ShowTicket}>
            {/* {t('editticket.ticketinfo')} */}View ticket info
          </Button>
          {showTicketInfo && (
            <div>
              {/* Display your ticket information here */}
              <p>TicketID: {ticketInfo.ticketId}</p>
              <p>MachineID: {ticketInfo.machine_Id}</p>
              <p>Status: {ticketInfo.status}</p>
              {/* <p><b>{t('editticket.problem')}</b>{ticketInfo.problem}</p>
          <p><b>{t('editticket.mbd')}</b>{ticketInfo.mustBeDoing}</p>
          <p><b>{t('editticket.tried')}</b>{ticketInfo.haveTried}</p>
          <p><b>{t('editticket.notes3')}</b>{ticketInfo.notes}</p> */}
              <p>Problem: {ticketInfo.problem}</p>
              <p>Must be doing: {ticketInfo.mustBeDoing}</p>
              <p>What have you tried?: {ticketInfo.haveTried}</p>
              <p>Notes: {ticketInfo.notes}</p>
            </div>
          )}
        </div>
        <div className="grid gap-2">
          {/* <h2 className='text-lg font-medium'>{t('editticket.notes')}</h2> */}
          <h2 className="text-lg font-medium">Add notes</h2>

          {/* <Textarea placeholder={t('editticket.notes2')} onChange={(e: any) => setNotes(e.currentTarget.value)}></Textarea> */}
          {/* <p className='text-md text-grey-900 '>{t('editticket.description')}</p> */}
          <Textarea
            placeholder="Still does not work because..."
            onChange={(e: any) => setNotes(e.currentTarget.value)}
          ></Textarea>
          <TextareaHint>
            Give us a detailed description on what you want to update the ticket
            with
          </TextareaHint>
          <Button variant="destructive" onClick={CloseTicket}>
            Close ticket
          </Button>
        </div>
        <div>
          {/* <h2 className='text-lg font-medium'>{t('editticket.pictures')}</h2> */}
          <h2 className="text-lg font-medium">Add pictures</h2>

          <Input
            type="file"
            name="image"
            accept="image/png, image/jpg"
            onChange={HandleOnChange}
            multiple
          />
          {preview.map((previewItem, index) => (
            <img
              key={index}
              src={previewItem as string}
              alt={`Preview ${index}`}
            />
          ))}
        </div>

        {/* <Button variant='destructive'  onClick={HandleSubmit}>{t('editticket.submit')}</Button>
        <Button variant='destructive'  onClick={HandleCancel}>{t('editticket.cancel')}</Button> */}
        <div>
          <Button variant="default" onClick={HandleSubmit}>
            Submit
          </Button>
          <Button variant="destructive" onClick={HandleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditTicket;
