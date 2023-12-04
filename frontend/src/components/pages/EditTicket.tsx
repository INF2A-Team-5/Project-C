import { SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Settings from '../foundations/settings'
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';


function EditTicket() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [])
    const navigate = useNavigate();
    const [notes, setNotes] = useState('');
    const [preview, setPreview] = useState<(string | ArrayBuffer)[]>([]);
    const [ticketInfo, setTicketInfo] = useState<any>(null);
    const ticketid = localStorage.getItem("currentticket");
    const [showTicketInfo, setShowTicketInfo] = useState(false);
    

    async function HandleCancel() {
        navigate(-1);
    }

    async function HandleOnChange(e: React.ChangeEvent<HTMLInputElement>){
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
    async function GetTicket() {
      let currentticket = await fetch("http://localhost:5119/api/tickets/" + ticketid,
      {
        method: "GET",
        headers: {
          "Authorization": "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        }
      }).then(data => data.json());
      console.log(currentticket);
      return currentticket
    }
    
    async function ShowTicket() {
      const currentticket = await GetTicket();
      setShowTicketInfo(true);
      setTicketInfo(currentticket);

    }

    async function HandleSubmit() {
      const currentticket = await GetTicket();
      const ticket = 
        {
          "TicketId": currentticket.ticketId,
          "Machine_Id": currentticket.machine_Id,
          "Customer_Id": currentticket.customer_Id,
          "Assigned_Id": currentticket.assigned_Id,
          "Priority": currentticket.priority,
          "Status": currentticket.status,

          "Problem": currentticket.problem,
          "HaveTried": currentticket.haveTried,
          "MustBeDoing": currentticket.mustBeDoing,
          "Date_Created": currentticket.date_Created,
        
          "Solution": currentticket.solution,
          "PhoneNumber": currentticket.phoneNumber,
          "Notes": currentticket.notes ? [...currentticket.notes, notes] : [notes],
          "files": currentticket.files ? [...currentticket.files, ...preview] : [...preview]
        }
    
    try {
    const response = await fetch("http://localhost:5119/api/tickets/" + ticketid,
    {
      method: "PUT",
      headers: {
        "Authorization": "bearer " + localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket)
    });
    if (!response.ok) {
      const errorResponse = await response.text(); // Capture response content
      throw new Error(`HTTP error! Status: ${response.status}. Error message: ${JSON.stringify(errorResponse)}`);
    }
    alert("Ticket updated")
    navigate(-1)
    // If needed, you can handle the response data here
  } catch (error) {
    console.error('Error during PUT request:', error);
  }
    
    }
    

    return (
        
        <div className='text-left pl-24'>
            <Settings></Settings>
            <div className='pb-8'>
        {/* <h1 className='text-4xl font-medium'>{t('editticket.header')}</h1> */}
        <h1 className='text-4xl font-medium'>Your ticket</h1>

        </div>
        <div className='pb-16'>
        
        <Button variant='destructive' onClick={ShowTicket}>
        {/* {t('editticket.ticketinfo')} */}View ticket info
      </Button>
      {showTicketInfo && (
        <div>
          {/* Display your ticket information here */}
          <p><b>TicketID: </b>{ticketInfo.ticketId}</p>
          <p><b>MachineID: </b>{ticketInfo.machine_Id}</p>
          <p><b>Status: </b>{ticketInfo.status}</p>
          {/* <p><b>{t('editticket.problem')}</b>{ticketInfo.problem}</p>
          <p><b>{t('editticket.mbd')}</b>{ticketInfo.mustBeDoing}</p>
          <p><b>{t('editticket.tried')}</b>{ticketInfo.haveTried}</p>
          <p><b>{t('editticket.notes3')}</b>{ticketInfo.notes}</p> */}
          <p><b>Problem: </b>{ticketInfo.problem}</p>
          <p><b>Must be doing: </b>{ticketInfo.mustBeDoing}</p>
          <p><b>What have you tried?: </b>{ticketInfo.haveTried}</p>
          <p><b>Notes: </b>{ticketInfo.notes}</p>
          
          <p></p>

        </div>
      )}

        {/* <h2 className='text-lg font-medium'>{t('editticket.notes')}</h2> */}
        <h2 className='text-lg font-medium'>Add notes</h2>

        {/* <Textarea placeholder={t('editticket.notes2')} onChange={(e: any) => setNotes(e.currentTarget.value)}></Textarea> */}
        {/* <p className='text-md text-grey-900 '>{t('editticket.description')}</p> */}
        <Textarea placeholder="Still does not work because..." onChange={(e: any) => setNotes(e.currentTarget.value)}></Textarea>
        <p className='text-md text-grey-900 '>Give us a detailed description on what you want to update the ticket with</p>

      </div>
      {/* <h2 className='text-lg font-medium'>{t('editticket.pictures')}</h2> */}
      <h2 className='text-lg font-medium'>Add pictures</h2>

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
        
        {/* <Button variant='destructive'  onClick={HandleSubmit}>{t('editticket.submit')}</Button>
        <Button variant='destructive'  onClick={HandleCancel}>{t('editticket.cancel')}</Button> */}
        <Button variant='destructive'  onClick={HandleSubmit}>Submit</Button>
        <Button variant='destructive'  onClick={HandleCancel}>Cancel</Button>
        </div>
        
    )
}

export default EditTicket;
