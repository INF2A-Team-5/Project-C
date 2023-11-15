import Header from '../foundations/header'
import Input from '../foundations/input'
import Button from '../foundations/button'
import Settings from '../foundations/settings'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next';

function LogIn() {
    const { t, i18n } = useTranslation();
    useEffect(() => {
      const lng = navigator.language;
      i18n.changeLanguage(lng);
    }, [])
    const lng = navigator.language;
    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng)
    }

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
    
    <div className='content grid-container'>
      <div className='login-left'>
        <div className='wrapper'>
          <h1>{t('login.txt_rotation0')}</h1>
          <div className='words'>
            <h1>{t('login.txt_rotation1')}</h1>
            <h1>{t('login.txt_rotation2')}</h1>
            <h1>{t('login.txt_rotation3')}</h1>
            <h1>{t('login.txt_rotation4')}</h1>
            <h1>{t('login.txt_rotation5')}</h1>
          </div>
        </div>
      </div>
      <div className='login-right'>
        <Header></Header>
        <div className='login-form'>
          <h2>{t('login.login')}</h2>
          <h3>{t('login.username')}</h3>
          <div>
            <Input hierarchy='xl' name='username' placeholder='Client1'
            onChange={e => setUsername(e.currentTarget.value)}
            />
          </div>
          <h3>{t('login.password')}</h3>
          <div>
            <Input hierarchy='xl' name='password' placeholder='******'
            // ●●●●●●●● als je circels wilt
            onChange={e => setPassword(e.currentTarget.value)}
            />
          </div>
          <label>
            {/* <input type="checkbox" className="checkbox" name="remember"/> Remember me */}
          </label>
          <br />
          <Settings></Settings>
          <Button hierarchy='xl' type="primary" onClick={handleSubmit} rounded="slight">{t('login.log_in')}</Button>
        </div>
      </div>
      
    </div>
  )
}

export default LogIn