import React, { useEffect, useRef, useState } from "react";
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

    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleDropdownFocus = (state:boolean) => {
        setOpen(!state)
    };
    
    return (
        <div className="setting">
            <div className="dropdown-container">
                <button className="dropdown" onClick={e => handleDropdownFocus(open)} ref={dropdownRef}></button>
                {open && (
                    <ul>
                        <li>test</li>
                        <li>test2</li>
                        <li><Button hierarchy='' intent="primary" onClick={toggleTheme} rounded="slight">{t('login.theme')}</Button></li>
                        <li>test3</li>
                        <li><Button hierarchy='' intent="primary" onClick={() => changeLanguage("en")} rounded="slight">lang_en</Button></li>
                    </ul>
                )}
                {/* <Button hierarchy='xl' intent="primary" onClick={toggleTheme} rounded="slight">{t('login.theme')}</Button>    
                <Button hierarchy='xl' intent="primary" onClick={() => changeLanguage("nl")} rounded="slight">lang_nl</Button>    
                <Button hierarchy='xl' intent="primary" onClick={() => changeLanguage("en")} rounded="slight">lang_en</Button> */}
            </div>
        </div>
        );
}


export default Settings;