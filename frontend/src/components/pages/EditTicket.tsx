import Input from '../foundations/input'
import Button from '../foundations/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Settings from '../foundations/settings'
import Textbox from '../foundations/textbox'


function EditTicket() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState('');
    const [preview, setPreview] = useState<(string | ArrayBuffer)[]>([]);

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

    async function HandleSubmit() {
      let currentticket = await fetch("http://localhost:5119/api/tickets/" + localStorage.getItem("Id"),
    {
      method: "GET",
      headers: {
        "Authorization": "bearer " + localStorage.getItem("Token"),
        "Content-Type": "application/json",
      }
    }).then(data => data.json());

      console.log(currentticket);
    
    }

    return (
        
        <div className='text-left pl-24'>
            <Settings></Settings>
            <div className='pb-8'>
        <h1 className='text-4xl font-medium'>Edit your ticket</h1>
        </div>
        <div className='pb-16'>
        <h2 className='text-lg font-medium'>Add notes</h2>
        <Textbox placeholder='Still does not work' hierarchy='lg' onChange={e => setNotes(e.currentTarget.value)}></Textbox>
        <p className='text-md text-grey-900 '>Give us a detailed description on what you want to update the ticket with</p>
      </div>
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
        
        <Button hierarchy='xl' type="primary" onClick={HandleSubmit} rounded="slight">Submit</Button>
        <Button hierarchy='sm' type="destructive" onClick={HandleCancel} rounded="slight">cancel</Button>
        </div>
        
    )
}

export default EditTicket;
