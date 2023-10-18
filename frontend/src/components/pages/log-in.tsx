import Header from '../foundations/header'
import Input from '../foundations/input'
import Button from '../foundations/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect } from "react";

function toggleTheme(){
  const htmlElement = document.documentElement;
  const isDarkMode = htmlElement.classList.contains("dark");

  if (isDarkMode) {
    htmlElement.classList.remove("dark");
  } else {
    htmlElement.classList.add("dark");
  }
}

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    async function handleSubmit() {
      let promise = axios.get("http://localhost:5119/api/accounts").then((response) => response.data)
      let MappedData = new Map<string, string>();
      for (let account of await promise)
      {
        MappedData.set(account.name, account.password)
      }
      if (MappedData.has(username) && MappedData.get(username) == password)
      {
        alert("loggin in...");
        navigate('/tickets');
      }
      else
      {
        alert("invalid credentials");
      }
  }
  return (
    
    <div className='content grid-container'>
      <div className='grid-item login-left resize-img'>
        <div className='wrapper'>
          <h1>Fully designing your process in</h1>
          <div className='words'>
            <h1>flowers & plants</h1>
            <h1>fruit & vegetables</h1>
            <h1>poultry</h1>
            <h1>insect farming</h1>
            <h1>intralogistics</h1>
          </div>
        </div>
      </div>
      <div className='grid-item'>
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
        <Button hierarchy='xl' intent="primary" onClick={toggleTheme} rounded="slight">theme</Button>    
      {/* </form> */}
      </div>
      
    </div>
  )
}

export default LogIn