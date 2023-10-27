import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  ExitIcon,
  Pencil1Icon,
  GlobeIcon,
  MagicWandIcon,
  SunIcon,
  MoonIcon,
} from '@radix-ui/react-icons';

function toggleThemeLight(){
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("dark");
}

function toggleThemeDark(){
    const htmlElement = document.documentElement;
    htmlElement.classList.add("dark");
}

function logOut(){}

function editAccount(){}


function Settings(){
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
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [urlsChecked, setUrlsChecked] = React.useState(false);
    const [person, setPerson] = React.useState('');
    const [icon, setIcon ] = React.useState('');

    return (
        <div className="dropdown-menu">
            <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="IconButton" aria-label="Customise options">
                <HamburgerMenuIcon />
                {/* <GearIcon /> */}
                </button>
            </DropdownMenu.Trigger>
            
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                <DropdownMenu.RadioGroup value={''} onValueChange={editAccount}>
                    <DropdownMenu.RadioItem className="DropdownMenuRadioItem" value="" disabled>
                    <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator transparant">
                        <Pencil1Icon className="transparant"/>
                    </DropdownMenu.ItemIndicator>
                    {t('setting.account')}
                    </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                    <div className="DropdownMenuItemIndicator transparant">
                        <MagicWandIcon className="transparant"/>
                    </div>
                    {t('setting.theme')}
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                        className="DropdownMenuSubContent"
                        sideOffset={2}
                        alignOffset={-5}
                    >
                        <DropdownMenu.CheckboxItem className="DropdownMenuItem" onClick={toggleThemeLight}>
                        <div className="DropdownMenuItemIndicator transparant">
                            <SunIcon className="transparant"/>
                        </div>
                        {t('setting.themeL')}
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.CheckboxItem className="DropdownMenuItem" onClick={toggleThemeDark}>
                        <div className="DropdownMenuItemIndicator transparant">
                            <MoonIcon className="transparant"/>
                        </div>
                        {t('setting.themeD')}
                        </DropdownMenu.CheckboxItem>
                    </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                    <div className="DropdownMenuItemIndicator transparant">
                        <GlobeIcon className="transparant"/>
                    </div>
                    {t('setting.lang')}
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                        className="DropdownMenuSubContent"
                        sideOffset={2}
                        alignOffset={-5}
                    >
                        <DropdownMenu.CheckboxItem className="DropdownMenuItem" onClick={() => changeLanguage("nl")}>
                            {t('setting.langNl')}
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.CheckboxItem className="DropdownMenuItem" onClick={() => changeLanguage("en")}>
                            {t('setting.langEn')}
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.Item className="DropdownMenuItem" disabled>
                            {t('setting.langPl')}
                        </DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.RadioGroup value={''} onValueChange={logOut}>
                    <DropdownMenu.RadioItem className="DropdownMenuRadioItem" value="" disabled>
                    <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator transparant">
                        <ExitIcon className='transparant'/>
                    </DropdownMenu.ItemIndicator>
                        {t('setting.logOut')}
                    </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>

                <DropdownMenu.Arrow className="DropdownMenuArrow" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
};

export default Settings;