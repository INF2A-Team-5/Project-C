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
    
    <div className='grid-container grid grid-cols-2 h-screen'>
      <div className='login-left bg-left bg-var(--background) bg-[url("https://viscongroup.eu/app/uploads/2023/01/MicrosoftTeams-image-77-scaled.jpg")] 
                      bg-cover bg-no-repeat bg-center object-fill left-1/2 grid place-items-center'>
        <div className="wrapper">
          <h1 className="text-5xl font-medium leading-10 mb-5 mt-5 bg-transparent">{t('login.txt_rotation0')}</h1>
          <div className="words border-b-0 font-medium border-transparent h-16 leading-16 text-5xl uppercase overflow-hidden bg-transparent">
            <h1 className="relative text-primary animation-rotate-words m-0">{t('login.txt_rotation1')}</h1>
            <h1 className="relative text-primary animation-rotate-words m-0">{t('login.txt_rotation2')}</h1>
            <h1 className="relative text-primary animation-rotate-words m-0">{t('login.txt_rotation3')}</h1>
            <h1 className="relative text-primary animation-rotate-words m-0">{t('login.txt_rotation4')}</h1>
            <h1 className="relative text-primary animation-rotate-words m-0">{t('login.txt_rotation5')}</h1>
          </div>
        </div>
      </div>
      <Settings></Settings>
      <div className='items-center justify-center flex flex-col'>
        <Header></Header>
        <div className='font-normal w-full'>
          <h2 className='text-2xl font-medium pt-2 pb-2'>{t('login.login')}</h2>
          <h3 className='text-lg text-grey-900 py-2'>{t('login.username')}</h3>
          <div>
            <Input hierarchy='md' name='username' placeholder='Client1'
            onChange={e => setUsername(e.currentTarget.value)}
            />
          </div>
          <h3 className='text-lg text-grey-900 py-2'>{t('login.password')}</h3>
          <div>
            <Input hierarchy='md' name='password' placeholder='******'
            // ●●●●●●●● als je circels wilt
            onChange={e => setPassword(e.currentTarget.value)}
            />
          </div>
          <label>
            {/* <input type="checkbox" className="checkbox" name="remember"/> Remember me */}
          </label>
          <br />
          <Button hierarchy='xl2' type="primary" onClick={handleSubmit} rounded="slight">{t('login.log_in')}</Button>
        </div>
      </div>
      
    </div>
  )
}

export default LogIn