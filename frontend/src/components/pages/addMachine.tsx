import Input from '../foundations/input'
import Button from '../foundations/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Settings from '../foundations/settings'

function AddMachine() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accountId, setAccountId] = useState(0);
  const navigate = useNavigate();

  async function handleSubmit() {
    const machine = await fetch("http://localhost:5119/api/machines").then((res) => res.json())
      .then(machines => machines.find((mach: any) => mach.name == name))

    if (machine !== undefined){
      alert("Machine name already exists");
    }
    
    else if (name == "")
    {
      alert("Enter a name");
    }    
    
    else if (description == "")
    {
      alert("Enter a description");
    }

    else if (!accountId || isNaN(accountId)) {
      alert("Enter a valid account ID");
    }

    //post request
    else
    {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"machineId": 0, "name": name, "description": description, "accountId": accountId})
      };
      fetch('http://localhost:5119/api/machines', requestOptions)
        .then(response => response.json())
        .then(data => alert("Machine added"));  
      
      navigate('/admin')
    }

}

  return (
    <div>
        <h2>Add Machine</h2>
        <div>
          <Input hierarchy='md' name='username' placeholder='Enter Machine Name'
          onChange={e => setName(e.currentTarget.value)}
          />
        </div>
        <h3></h3>
        <div>
          <Input hierarchy='md' name='username' placeholder='Enter Description'
          onChange={e => setDescription(e.currentTarget.value)}
          />
        </div>
        <h3></h3>
        <div>
          <Input hierarchy='md' name='username' placeholder='Enter Account ID'
          onChange={e => setAccountId(parseInt(e.currentTarget.value))}
          />
        </div>
        <br />
        <Settings></Settings>
        <Button hierarchy='xl' type="primary" onClick={handleSubmit} rounded="slight">Add Machine</Button>
        <h3></h3>
        <Button hierarchy='md' type="destructive" onClick={() => window.location.href='/admin'} rounded="slight">Back</Button>
    </div>
  );
}

export default AddMachine;