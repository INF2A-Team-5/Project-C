import Input from '../foundations/input'
import Button from '../foundations/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Settings from '../foundations/settings'

function EditAccount() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();

  async function handleSubmit() {

    //add logic to check if new password and confirm password are the same, maybe also not the same as the old password

    // also need another function for changing phone number

    // need accounts to be connected to current user so i can change the phone number of the current user
}

  return (
    <div>
        <h2>Change Phone Number</h2>
        <div>
          <Input hierarchy='xl' name='username' placeholder='Enter Phone Number'
          onChange={e => setPhone(e.currentTarget.value)}
          />
        </div>
        <h3></h3>
        <Button hierarchy='lg' intent="primary" onClick={handleSubmit} rounded="slight">Change Phone Number</Button>
        <h3></h3>
        <h2>Change Password</h2>
        <div>
          <Input hierarchy='xl' name='password' placeholder='Enter New Password'
          onChange={e => setPassword(e.currentTarget.value)}
          />
        </div>
        <h3></h3>
        <div>
          <Input hierarchy='xl' name='password' placeholder='Confirm New Password'
          onChange={e => setConfirmPass(e.currentTarget.value)}
          />
        </div>
        <br />
        <Settings></Settings>
        <Button hierarchy='lg' intent="primary" onClick={handleSubmit} rounded="slight">Change Password</Button>
        <h3></h3>
        <Button hierarchy='md' intent="destructive" onClick={() => window.location.href='/tickets'} rounded="slight">Back</Button>
    </div>
  );
}

export default EditAccount;