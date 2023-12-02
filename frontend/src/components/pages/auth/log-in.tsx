import Settings from "../../foundations/settings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { t } from "i18next";
import Header from "@/components/foundations/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
// import { Label } from "@radix-ui/react-label";
import { TextareaHint } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function LogIn() {
  // const { t, i18n } = useTranslation();
  // useEffect(() => {
  //   i18n.changeLanguage(navigator.language);
  // }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    if (username === "" || password === "") {
      toast({
        variant: "destructive",
        title: "Error! Something went wrong.",
        description: "Fill in all fields before logging in.",
      });
    } else {
      try {
        const account = await fetch("http://localhost:5119/api/Auth/Login", {
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
          document.cookie = `jwtToken=${account.token}`;
          // Cookies.set('token', token, { expires: 1, secure: true })
          switch (account.class) {
            case "Client":
              navigate("/tickets");
              break;
            case "Admin":
              navigate("/admin");
              break;
            case "ServiceEmployee":
              navigate("/serviceEmployee");
              break;
          }
        }
      } catch {
        toast({
          variant: "destructive",
          title: "Error! Something went wrong.",
          description:
            "Please ensure your username and password are entered correctly and try again.",
        });
      }
    }
  }
  return (
    <div className="grid-container grid grid-cols-2 h-screen">
      <div
        className='login-left bg-left bg-var(--background) bg-[url("https://viscongroup.eu/app/uploads/2023/01/MicrosoftTeams-image-77-scaled.jpg")] 
                      bg-cover bg-no-repeat object-fill left-1/2 grid place-items-center'
      >
        <div className="wrapper">
          <h1 className="text-5xl font-medium leading-10 mb-5 mt-5 bg-transparent">
            {t("login.txt_rotation0")}
          </h1>
          <div className="words border-b-0 font-medium border-transparent h-16 leading-16 text-5xl uppercase overflow-hidden bg-transparent">
            <h1 className="relative text-primary animation-rotate-words m-0">
              {t("login.txt_rotation1")}
            </h1>
            <h1 className="relative text-primary animation-rotate-words m-0">
              {t("login.txt_rotation2")}
            </h1>
            <h1 className="relative text-primary animation-rotate-words m-0">
              {t("login.txt_rotation3")}
            </h1>
            <h1 className="relative text-primary animation-rotate-words m-0">
              {t("login.txt_rotation4")}
            </h1>
            <h1 className="relative text-primary animation-rotate-words m-0">
              {t("login.txt_rotation5")}
            </h1>
          </div>
        </div>
      </div>
      <Settings></Settings>
      <div className="items-center text-center justify-center flex flex-col">
        <Header></Header>
        <div className="w-2/5 grid gap-4">
          <div>
            <h2 className="text-2xl font-medium">{t("login.login")}</h2>
            <TextareaHint>
              Enter login details to access your account.
            </TextareaHint>
          </div>
          <div className="grid gap-1">
            <Label>{t("login.username")}</Label>
            <Input
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label>{t("login.password")}</Label>
            <Input
              name="password"
              placeholder="******"
              type="password"
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
            >
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
