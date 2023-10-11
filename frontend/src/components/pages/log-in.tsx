import Header from '../foundations/header'
import Input from '../foundations/input'
import Button from '../foundations/button'
import { useState } from 'react'
import axios from 'axios'

async function fetchData(username: string, pw: string) {
    let promise = axios.get("http://localhost:5119/api/accounts").then((response) => response.data)
    let MappedData = new Map<string, string>();
    for (let account of await promise)
    {
      MappedData.set(account.name, account.password)
    }
    if (MappedData.has(username) && MappedData.get(username) == pw)
    {
      alert("loggin in...");
      window.location.assign('/tickets');
      //useHref("/tickets");
    }
    else
    {
      alert("invalid credentials");
    }
}

function LogIn() {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const handleSubmit = () => 
    {
      fetchData(username, password)
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