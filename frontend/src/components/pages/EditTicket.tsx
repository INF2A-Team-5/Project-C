import Input from '../foundations/input'
import Button from '../foundations/button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Settings from '../foundations/settings'
import Textbox from '../foundations/textbox'
import { useTranslation } from 'react-i18next';
import DropDown from '../foundations/DropDown'


function EditTicket() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [])
    const navigate = useNavigate();
    const [notes, setNotes] = useState('');
    const [preview, setPreview] = useState<(string | ArrayBuffer)[]>([]);
    const [ticketInfo, setTicketInfo] = useState(null);
    const ticketid = localStorage.getItem("currentticket");
    

    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const toggleDropDown = () => {
      setShowDropDown(!showDropDown);
      ShowTicket();
    };

    async function HandleCancel() {
        navigate('/client');
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
    navigate("/client")
    // If needed, you can handle the response data here
  } catch (error) {
    console.error('Error during PUT request:', error);
  }
    
    }
    

    return (
        
        <div className='text-left pl-24'>
            <Settings></Settings>
            <div className='pb-8'>
        <h1 className='text-4xl font-medium'>{t('editticket.header')}</h1>
        </div>
        <div className='pb-16'>
        <Button hierarchy='lg' type='primary' onClick={ShowTicket}>
                Show ticket information
            </Button>
            {ticketInfo && (
                <div>
                    <h2>Ticket Information:</h2>
                    <p>Ticket ID: {ticketInfo}</p>
                    {/* Display other ticket details */}
                </div>
            )}
        <h2 className='text-lg font-medium'>{t('editticket.notes')}</h2>
        <Textbox placeholder={t('editticket.notes2')} hierarchy='lg' onChange={e => setNotes(e.currentTarget.value)}></Textbox>
        <p className='text-md text-grey-900 '>{t('editticket.description')}</p>
      </div>
      <h2 className='text-lg font-medium'>{t('editticket.pictures')}</h2>
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
        
        <Button hierarchy='xl' type="primary" onClick={HandleSubmit} rounded="slight">{t('editticket.submit')}</Button>
        <Button hierarchy='md' type="destructive" onClick={HandleCancel} rounded="slight">{t('editticket.cancel')}</Button>
        </div>
        
    )
}

export default EditTicket;
