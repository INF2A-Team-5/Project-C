import Settings from "../../foundations/settings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icons } from "@/components/foundations/icons";
import Header from "@/components/foundations/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { TextareaHint } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import React from "react";
import { API_BASE_URL } from "@/lib/api";

function LogIn() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (event.currentTarget === usernameRef.current) {
        passwordRef.current?.focus();
      } else if (event.currentTarget === passwordRef.current) {
        handleSubmit();
      }
    }
  };

  async function handleSubmit() {
    setIsLoading(true);
    if (username === "" || password === "") {
      toast({
        variant: "destructive",
        title: "Error! Something went wrong.",
        description: "Fill in all fields before logging in.",
      });
      setIsLoading(false);
    } else {
      try {
        const account = await fetch(API_BASE_URL + "/api/Auth/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username, password: password }),
        }).then((account) => account.json());
        if (account !== undefined) {
          localStorage.setItem("username", account.name);
          localStorage.setItem("Id", account.accountId);
          localStorage.setItem("Token", account.token);
          localStorage.setItem("Class", account.class);
          document.cookie = `jwtToken=${account.token}`;
          // Cookies.set('token', token, { expires: 1, secure: true })
          navigate("/tickets");
        }
      } catch {
        toast({
          variant: "destructive",
          title: "Error! Something went wrong.",
          description:
            "Please ensure your username and password are entered correctly and try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <div className="grid-container grid h-screen grid-cols-2">
      <div
        className='login-left bg-var(--background) left-1/2 grid 
                      place-items-center bg-[url("https://viscongroup.eu/app/uploads/2023/01/MicrosoftTeams-image-77-scaled.jpg")] bg-cover bg-left bg-no-repeat object-fill'
      >
        <div className="wrapper">
          <h1 className="mb-5 mt-5 bg-transparent font-medium leading-10">
            {t("login.txt_rotation0")}
          </h1>
          <div className="words leading-16 h-16 overflow-hidden border-b-0 border-transparent bg-transparent font-medium uppercase">
            <h1 className="animation-rotate-words relative m-0 text-primary">
              {t("login.txt_rotation1")}
            </h1>
            <h1 className="animation-rotate-words relative m-0 text-primary">
              {t("login.txt_rotation2")}
            </h1>
            <h1 className="animation-rotate-words relative m-0 text-primary">
              {t("login.txt_rotation3")}
            </h1>
            <h1 className="animation-rotate-words relative m-0 text-primary">
              {t("login.txt_rotation4")}
            </h1>
            <h1 className="animation-rotate-words relative m-0 text-primary">
              {t("login.txt_rotation5")}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <div className="fixed right-5 top-5">
          <Settings />
        </div>
        <Header></Header>
        <div className="grid w-2/5 gap-4">
          <div>
            <h2 className="text-2xl font-medium">{t("login.login")}</h2>
            <TextareaHint>
              Enter login details to access your account.
            </TextareaHint>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">{t("login.username")}</Label>
            {/* <Label htmlFor="username">Voer gegevens in</Label> */}
            <Input
              id="username"
              ref={usernameRef}
              name="username"
              placeholder="Client123"
              onKeyDown={handleEnter}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t("login.password")}</Label>
            <Input
              id="password"
              ref={passwordRef}
              name="password"
              placeholder="*******"
              type="password"
              onKeyDown={handleEnter}
              // ●●●●●●●● als je circels wilt
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          {/* <div className="mx-auto flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div> */}
          <div>
            <Button
              className="w-full"
              variant="default"
              size="lg"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {t("login.log_in")}
            </Button>
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
