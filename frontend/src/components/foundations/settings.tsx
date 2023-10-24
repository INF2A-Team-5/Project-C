import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Button from './button';

function toggleTheme(){
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.contains("dark");
  
    if (isDarkMode) {
      htmlElement.classList.remove("dark");
    } else {
      htmlElement.classList.add("dark");
    }
}

function Settings() {
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])
    
    const lng = navigator.language;
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }
    
    return (
        <div className="setting">
            <Button hierarchy='xl' intent="primary" onClick={toggleTheme} rounded="slight">{t('login.theme')}</Button>    
            <Button hierarchy='xl' intent="primary" onClick={() => changeLanguage("nl")} rounded="slight">lang_nl</Button>    
            <Button hierarchy='xl' intent="primary" onClick={() => changeLanguage("en")} rounded="slight">lang_en</Button>
        </div>
        );
}


export default Settings;