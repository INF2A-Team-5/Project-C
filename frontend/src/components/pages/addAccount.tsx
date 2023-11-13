import Input from '../foundations/input'
import Button from '../foundations/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Settings from '../foundations/settings'

function AddAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Client');
  const navigate = useNavigate();

  async function handleSubmit() {
    const account = await fetch("http://localhost:5119/api/accounts").then((res) => res.json())
      .then(accounts => accounts.find((acc: any) => acc.name == username))

    if (account !== undefined){
      alert("Username already exists");
    }
    
    else if (username == "")
    {
      alert("Enter a username");
    }    
    
    else if (password == "")
    {
      alert("Enter a password");
    }

    //post request
    else
    {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"accountId": 0, "name": username, "password": password, "Class": userType})
      };
      fetch('http://localhost:5119/api/accounts', requestOptions)
        .then(response => response.json())
        .then(data => alert("Account added")); 
        
      navigate('/admin')
    }

}

  return (
    <div>
        <h2>Add Account</h2>
        <div>
          <Input hierarchy='xl' name='username' placeholder='Enter Username'
          onChange={e => setUsername(e.currentTarget.value)}
          />
        </div>
        <h3></h3>
        <div>
          <Input hierarchy='xl' name='password' placeholder='Enter Password'
          onChange={e => setPassword(e.currentTarget.value)}
          />
        </div>
        <h3>User Type</h3>
      <div>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          
        >
          <option value="Admin">Admin</option>
          <option value="Client">Client</option>
          <option value="ServiceEmployee">Service Employee</option>
        </select>
      </div>
        <br />
        <Settings></Settings>
        <Button hierarchy='xl' intent="primary" onClick={handleSubmit} rounded="slight">Add Account</Button>
        <h3></h3>
        <Button hierarchy='md' intent="destructive" onClick={() => window.location.href='/admin'} rounded="slight">Back</Button>
    </div>
  );
}

export default AddAccount;