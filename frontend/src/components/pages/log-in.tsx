import Header from '../foundations/header'
import Input from '../foundations/input'
import Button from '../foundations/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    async function handleSubmit() {
      const account = await fetch("http://localhost:5119/api/accounts").then((res) => res.json())
        .then(accounts => accounts.find((acc: any) => acc.name == username && acc.password == password))
      if (account !== undefined)
      {
        alert("Logging in...")
        switch (account.class) {
          case "Client":
            navigate('/tickets');
            break;
          case "Admin":
            navigate('/admin');
            break;
          case "ServiceEmployee":
            navigate('/serviceEmployee');          
            break;
        }
      }
      else
      {
        alert("invalid credentials");
      }
  }
  return (
    
    <div>
      {/* <form onSubmit={handleSubmit}> */}
        <Header></Header>
        <h2>Login</h2>
        <h3>Username</h3>
        <div>
          
          {/* <label htmlFor="username"></label> */}
          <Input hierarchy='xl' name='username' placeholder='Enter Username'
          onChange={e => setUsername(e.currentTarget.value)}
          //onChange={e => setUsername(e.target.value)}
          />
        </div>
        <h3>Password</h3>
        <div>
          {/* <label htmlFor="password"></label> */}
          <Input hierarchy='xl' name='password' placeholder='Enter Password'
          onChange={e => setPassword(e.currentTarget.value)}
          />
        </div>
        {/* <label>
          <input type="checkbox" class="defaultcheckbox" name="remember"> Remember me
        </label> */}
        <br />
        <Button hierarchy='xl' intent="primary" onClick={handleSubmit} rounded="slight">Log in</Button>
      {/* </form> */}
    </div>
  )
}

export default LogIn