import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'
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

function logOut() {}

function editAccount() {
    window.location.href='/edit-account'
}


function Settingss(){
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
        <div className="top-7 right-7 fixed">
            <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="rounded-full w-[35px] h-[35px] inline-flex items-center scale-[2] justify-center text-white dark:text-secondary-500  outline-none focus:outline-none" 
                        aria-label="Customise options">
                    <HamburgerMenuIcon />
                </button>
            </DropdownMenu.Trigger>
            
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-[220px] bg-transparant border-2 border-solid border-[var(--border)] rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade
                                                 data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade" 
                                        sideOffset={5}>
                <DropdownMenu.RadioGroup value={''} onValueChange={editAccount}>
                    <DropdownMenu.RadioItem className="text-md group leading-none text-primary-300 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none overflow-hidden outline-none 
                                                    data-[disabled]:text-grey-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-400 data-[highlighted]:text-white dark:data-[highlighted]:text-dark-500" 
                            	            value="">
                    <DropdownMenu.ItemIndicator className="absolute group-hover:bg-primary-400 left-0 w-[25px] inline-flex items-center justify-center scale-110">
                        <Pencil1Icon className="hover:bg-primary-400 group-hover:bg-primary-400"/>
                    </DropdownMenu.ItemIndicator>
                    {t('setting.account')}
                    </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
                <DropdownMenu.Separator className="h-[1px] bg-[var(--border)] m-[5px]"/>
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="overflow-hidden group text-md leading-none text-primary-300 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-primary-400 
                                                        group-data-[state=open]:bg-primary-400 data-[state=open]:text-white dark:data-[state=open]:text-dark-500 data-[disabled]:text-grey-900 data-[disabled]:pointer-events-none 
                                                        data-[highlighted]:bg-primary-400 data-[highlighted]:text-white dark:data-[highlighted]:text-dark-500 data-[highlighted]:data-[state=open]:bg-primary-400">
                    <div className="absolute group-hover:bg-primary-400 left-0 w-[25px] inline-flex items-center justify-center scale-110 group-data-[state=open]:bg-primary-400">
                        <MagicWandIcon className="hover:bg-primary-400 group-hover:bg-primary-400 group-data-[state=open]:bg-primary-400"/>
                    </div>
                    {t('setting.theme')}
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                        className="min-w-[220px] bg-transparant border-2 border-solid border-[var(--border)] rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade 
                                    data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        sideOffset={2}
                        alignOffset={-5}
                    >
                        <DropdownMenu.CheckboxItem className="group overflow-hidden text-md leading-none text-primary-300 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none 
                                                            data-[disabled]:text-grey-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-400 data-[highlighted]:text-white dark:data-[highlighted]:text-dark-500" 
                                                    onClick={toggleThemeLight}>
                        <div className="absolute group-hover:bg-primary-400 left-0 w-[25px] inline-flex items-center justify-center scale-110">
                            <SunIcon className="hover:bg-primary-400 group-hover:bg-primary-400"/>
                        </div>
                        {t('setting.themeL')}
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.CheckboxItem className="group overflow-hidden text-md leading-none text-primary-300 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none 
                                                            data-[disabled]:text-grey-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-400 data-[highlighted]:text-white dark:data-[highlighted]:text-dark-500" 
                                                    onClick={toggleThemeDark}>
                        <div className="absolute group-hover:bg-primary-400 left-0 w-[25px] inline-flex items-center justify-center scale-110">
                            <MoonIcon className="hover:bg-primary-400 group-hover:bg-primary-400"/>
                        </div>
                        {t('setting.themeD')}
                        </DropdownMenu.CheckboxItem>
                    </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="overflow-hidden group text-md leading-none text-primary-300 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-primary-400 
                                                        group-data-[state=open]:bg-primary-400 data-[state=open]:text-white dark:data-[state=open]:text-dark-500 data-[disabled]:text-grey-900 data-[disabled]:pointer-events-none 
                                                        data-[highlighted]:bg-primary-400 data-[highlighted]:text-white dark:data-[highlighted]:text-dark-500 data-[highlighted]:data-[state=open]:bg-primary-400nMenuSubTrigger">
                    <div className="absolute group-hover:bg-primary-400 left-0 w-[25px] inline-flex items-center justify-center scale-110 group-data-[state=open]:bg-primary-400">
                        <GlobeIcon className="hover:bg-primary-400 group-hover:bg-primary-400 group-data-[state=open]:bg-primary-400"/>
                    </div>
                    {t('setting.lang')}
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                        className="min-w-[220px] bg-transparant border-2 border-solid border-[var(--border)] rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade 
                                    data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        sideOffset={2}
                        alignOffset={-5}
                    >
                        <DropdownMenu.CheckboxItem className="group overflow-hidden text-md leading-none text-primary-300 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none 
                                                            data-[disabled]:text-grey-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-400 data-[highlighted]:text-white dark:data-[highlighted]:text-dark-500" 
                                                    onClick={() => changeLanguage("nl")}>
                                                    {t('setting.langNl')}
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.CheckboxItem className="group overflow-hidden text-md leading-none text-primary-300 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none 
                                                            data-[disabled]:text-grey-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-400 data-[highlighted]:text-white dark:data-[highlighted]:text-dark-500" 
                                                    onClick={() => changeLanguage("en")}>
                                                    {t('setting.langEn')}
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.CheckboxItem className="group overflow-hidden text-md leading-none text-primary-300 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none 
                                                            data-[disabled]:text-grey-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-400 data-[highlighted]:text-white dark:data-[highlighted]:text-dark-500" 
                                                    onClick={() =>{}}
                                                    disabled>
                                                    {t('setting.langPl')}
                        </DropdownMenu.CheckboxItem>
                    </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>
                <DropdownMenu.Separator className="h-[1px] bg-[var(--border)] m-[5px]"/>
                <DropdownMenu.RadioGroup value={''} onValueChange={logOut}>
                    <DropdownMenu.RadioItem className="text-md group leading-none text-primary-300 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none overflow-hidden outline-none 
                                                    data-[disabled]:text-grey-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-400 data-[highlighted]:text-white dark:data-[highlighted]:text-dark-500" 
                                            value="" >
                    <DropdownMenu.ItemIndicator className="absolute group-hover:bg-primary-400 left-0 w-[25px] inline-flex items-center justify-center scale-110">
                        <ExitIcon className="hover:bg-primary-400 group-hover:bg-primary-400"/>
                    </DropdownMenu.ItemIndicator>
                        {t('setting.logOut')}
                    </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>

                <DropdownMenu.Arrow className="fill-[var(--border)]" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
};

export default Settingss;