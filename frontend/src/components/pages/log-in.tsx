import Header from '../foundations/header'
import Input from '../foundations/input'
import Button from '../foundations/button'
import React, { useState } from 'react'
import axios from 'axios'

function fetchData(username: string, password: string) {
    const promise = axios.get("http://localhost:5216/api/Accounts", {
      params: {
        Name: username,
        Password: password,
      }
    })
    // const datapromise = promise.then((response) => {  });
  
    console.log(promise)
    return promise;
     // Handle the response
     // Handle the error
}

type Account = {
  name: string
  password: string
}


function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => 
    {
      if (fetchData(username, password))
      {
        // window.location.href = "/tickets";
        //<Tickets />
        //Tickets()
        alert("nice");
        //window.location.assign('/tickets');
        //useHref("/tickets");
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
          onChange={e => setUsername((e.target as HTMLInputElement).value)}
          //onChange={e => setUsername(e.target.value)}
          />
        </div>
        <h3>Password</h3>
        <div>
          {/* <label htmlFor="password"></label> */}
          <Input hierarchy='xl' name='password' placeholder='Enter Password'
          onChange={e => setPassword((e.target as HTMLInputElement).value)}
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