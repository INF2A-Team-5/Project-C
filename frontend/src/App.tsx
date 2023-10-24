// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import LogIn from './components/pages/log-in';
import React, { useEffect, useState } from 'react'

// import { useTranslation } from 'react-i18next';

function App() {
//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     const lng = navigator.language;
//     i18n.changeLanguage(lng);
//   }, [])

//   const lng = navigator.language;

  return (

    <div>
      {/* <h1>
        {t('greeting.hello')}
      </h1> */}
      {/* <span>
        Browser Language: {lng}
      </span> */}
      <LogIn/>
    </div>
  );
}

export default App;