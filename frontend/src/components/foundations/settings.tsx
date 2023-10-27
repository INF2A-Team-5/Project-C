import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from './button';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
  ExitIcon,
} from '@radix-ui/react-icons';

function toggleTheme(){
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.contains("dark");
  
    if (isDarkMode) {
      htmlElement.classList.remove("dark");
    } else {
      htmlElement.classList.add("dark");
    }
}

// function Settings() {
//     const { t, i18n } = useTranslation();
//  
//     useEffect(() => {
//         const lng = navigator.language;
//         i18n.changeLanguage(lng);
//     }, [])
    
//     const lng = navigator.language;
//     const changeLanguage = (lng: string) => {
//         i18n.changeLanguage(lng)
//     }

//     const [open, setOpen] = useState<boolean>(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     const handleDropdownFocus = (state:boolean) => {
//         setOpen(!state)
//     };
    
//     return (
//         <div className="setting">
//             <div className="dropdown-container">
//                 <button className="dropdown" onClick={e => handleDropdownFocus(open)} ref={dropdownRef}></button>
//                 <div className="dropdown-menu">{open && (
//                     <ul>
//                         <li>Profiel---------------------</li>
//                         <li>test2</li>
//                         <li><Button hierarchy='ad' intent="secondary" onClick={toggleTheme} rounded="slight">{t('login.theme')}</Button></li>
//                         <li><Button hierarchy='ad' intent="secondary" onClick={() => changeLanguage("nl")} rounded="slight">Lang_nl</Button></li>
//                         <li><Button hierarchy='ad' intent="secondary" onClick={() => changeLanguage("en")} rounded="slight">Lang_en</Button></li>
//                         <li><Button hierarchy='ad' intent="secondary" onClick={() => changeLanguage("en")} rounded="slight"><ExitIcon className="icon"/>Exit</Button></li>
                        
//                     </ul>
//                 )}</div>
//                 {/* <Button hierarchy='xl' intent="primary" onClick={toggleTheme} rounded="slight">{t('login.theme')}</Button>    
//                 <Button hierarchy='xl' intent="primary" onClick={() => changeLanguage("nl")} rounded="slight">lang_nl</Button>    
//                 <Button hierarchy='xl' intent="primary" onClick={() => changeLanguage("en")} rounded="slight">lang_en</Button> */}
//             </div>
//         </div>
//         );
// }


// export default Settings;
// import '../../';

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
    const [person, setPerson] = React.useState('pedro');

    return (
        <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
            <button className="IconButton" aria-label="Customise options">
            <HamburgerMenuIcon />
            </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
                <DropdownMenu.RadioItem className="DropdownMenuRadioItem" value="pedro" disabled>
                Account Aanpassen
                </DropdownMenu.RadioItem>
                {/* <DropdownMenu.RadioItem className="DropdownMenuRadioItem" value="colm">
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                Colm Tuite
                </DropdownMenu.RadioItem> */}
            </DropdownMenu.RadioGroup>
            <DropdownMenu.CheckboxItem className="DropdownMenuItem" onClick={toggleTheme}>
                Thema{/* <div className="RightSlot">⇧+⌘+N</div> */}
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                Taal
                <div className="RightSlot">
                    <ChevronRightIcon />
                </div>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                    className="DropdownMenuSubContent"
                    sideOffset={2}
                    alignOffset={-5}
                >
                    {/* <DropdownMenu.Item className="DropdownMenuItem">
                    Save Page As… <div className="RightSlot">⌘+S</div>
                    </DropdownMenu.Item> */}
                    <DropdownMenu.CheckboxItem className="DropdownMenuItem" onClick={() => changeLanguage("nl")}>Nederlands</DropdownMenu.CheckboxItem>
                    <DropdownMenu.CheckboxItem className="DropdownMenuItem" onClick={() => changeLanguage("en")}>Engels</DropdownMenu.CheckboxItem>
                    <DropdownMenu.Item className="DropdownMenuItem">Engels</DropdownMenu.Item>
                    {/* <DropdownMenu.Separator className="DropdownMenu.Separator" /> */}
                    <DropdownMenu.Item className="DropdownMenuItem" disabled>Pools</DropdownMenu.Item>
                </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            {/* <DropdownMenu.Separator className="DropdownMenuSeparator" />

            <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={bookmarksChecked}
                onCheckedChange={setBookmarksChecked}
            >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <CheckIcon />
                </DropdownMenu.ItemIndicator>
                Show Bookmarks <div className="RightSlot">⌘+B</div>
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={urlsChecked}
                onCheckedChange={setUrlsChecked}
            >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <CheckIcon />
                </DropdownMenu.ItemIndicator>
                Show Full URLs
            </DropdownMenu.CheckboxItem> */}

            <DropdownMenu.Separator className="DropdownMenuSeparator" />

            {/* <DropdownMenu.Label className="DropdownMenuLabel">People</DropdownMenu.Label> */}
            <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
                <DropdownMenu.RadioItem className="DropdownMenuRadioItem" value="pedro" disabled>
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <ExitIcon className='icon'/>
                </DropdownMenu.ItemIndicator>
                Log out
                </DropdownMenu.RadioItem>
                {/* <DropdownMenu.RadioItem className="DropdownMenuRadioItem" value="colm">
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                Colm Tuite
                </DropdownMenu.RadioItem> */}
            </DropdownMenu.RadioGroup>

            <DropdownMenu.Arrow className="DropdownMenuArrow" />
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default Settings;