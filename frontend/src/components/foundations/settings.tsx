import i18next from "i18next";
import { MoonIcon, PersonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const DROPDOWN_ICON_CLASSES = "w-5 mr-2";

function toggleThemeLight() {
  document.documentElement.classList.remove("dark");
}

function toggleThemeDark() {
  document.documentElement.classList.add("dark");
}

function logOut() {
  localStorage.clear();
}

const changeLanguage = (lng: string) => {
  i18next.changeLanguage(lng);
};

function Settings() {
  const isLoggedIn = localStorage.getItem("Token") != null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-label="Customize options">
        {/* <HamburgerMenuIcon className="w-6 h-6" /> */}
        <div className="cursor-pointer rounded-full border border-border p-2.5 transition-colors duration-300 hover:bg-muted">
          <PersonIcon className="h-5 w-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2">
        <DropdownMenuLabel>Options</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {isLoggedIn ? (
          <>
            <Link to="/edit-account">
              <DropdownMenuItem>
                {i18next.t("setting.account")}
              </DropdownMenuItem>
            </Link>
          </>
        ) : null}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {i18next.t("setting.theme")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={toggleThemeLight}>
                <SunIcon className={DROPDOWN_ICON_CLASSES} />
                {i18next.t("setting.themeL")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleThemeDark}>
                <MoonIcon className={DROPDOWN_ICON_CLASSES} />
                {i18next.t("setting.themeD")}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {i18next.t("setting.lang")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => changeLanguage("nl")}>
                {i18next.t("lang.nl")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("en")}>
                {i18next.t("lang.en")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}} disabled>
                {i18next.t("lang.pl")}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {isLoggedIn ? (
          <>
            <DropdownMenuSeparator />
            <Link to={"/auth/login"}>
              <DropdownMenuItem onClick={logOut}>
                {i18next.t("setting.logOut")}
              </DropdownMenuItem>
            </Link>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Settings;
