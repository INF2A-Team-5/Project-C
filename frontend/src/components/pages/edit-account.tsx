import { useEffect, useState } from "react";
import Settings from "../foundations/settings";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import Header from "../foundations/header";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Icons } from "../foundations/icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
} from "@/lib/api";
import { toast } from "../ui/use-toast";
import React from "react";
import { Toaster } from "../ui/toaster";
import Layout from "../layout";
import { useTranslation } from "react-i18next";
import { PasswordInput } from "../ui/passwordinput";
import { Checkbox } from "../ui/checkbox";

function EditAccount() {
  // useAuthenticated();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState("");
  const [visibleNewPass, setVisibleNewPass] = useState<boolean>(false);
  const [visibleOldPass, setVisibleOldPass] = useState<boolean>(false);
  const [visibleConfPass, setVisibleConfPass] = useState<boolean>(false);

  const passwordRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const phoneRegex: RegExp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const [phonePlaceholder, setPhonePlaceholder] = useState("");

  useEffect(() => {
    async function fetchPhoneStatus() {
      const phoneStatus = await hasPhoneConnected();
      setPhonePlaceholder(phoneStatus);
    }

    fetchPhoneStatus();

    return () => {
      // cleanup
    };
  }, []);

  function validatePhone() {
    return phoneRegex.test(phone);
  }

  async function hasPhoneConnected(): Promise<string> {
    let currentaccount = await fetch(
      API_BASE_URL + "/api/accounts/",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((accounts) =>
        accounts.find(
          (acc: any) => acc.accountId == localStorage.getItem("Id"),
        ),
      );

    if (currentaccount.phoneNumber == null) {
      return t("editaccount.changephonenumberdes");
    } else {
      return currentaccount.phoneNumber;
    }
  }

  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);

  async function handleSubmitPhone() {
    setIsLoading(true);
    let currentaccount = await fetch(
      API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
      getBaseQueryRequest(),
    ).then((data) => data.json());

    if (validatePhone() == true) {
      currentaccount.phoneNumber = phone;

      await fetch(
        API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
        putBaseMutateRequest(JSON.stringify(currentaccount)),
      );

      toast({
        variant: "default",
        title: "Succes!",
        description: t("editaccount.changedsuccess"),
      });
      setIsLoading(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error!",
        description: t("editaccount.changedinvalid"),
      });
      setIsLoading(false);
    }
  }

  async function handleSubmitPass() {
    setIsLoading(true);
    let currentaccount = await fetch(
      API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
      getBaseQueryRequest(),
    ).then((data) => data.json());

    if (password !== confirmPass || oldPassword != currentaccount.password) {
      toast({
        variant: "destructive",
        title: "Error!",
        description:
          t("editaccount.passincorrect"),
      });
      setIsLoading(false);
    } else {
      currentaccount.password = password;
      await fetch(
        API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
        putBaseMutateRequest(JSON.stringify(currentaccount)),
      );
      toast({
        variant: "default",
        title: "Succes!",
        description: t("editaccount.passsuccess"),
      });
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div>
          <h1 className="text-3xl font-medium">{t("editaccount.editaccount")}</h1>
          <Label>{t("editaccount.editaccountdes")}</Label>
        </div>
        <div className="grid gap-2">
          <h2>{t("editaccount.changephonenumber")}</h2>
          <Input
            name="phone number"
            placeholder={phonePlaceholder}
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
          <Button
            className="w-fit"
            onClick={handleSubmitPhone}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("editaccount.changephonenumber")}
          </Button>
        </div>
        <div className="grid gap-2">
          <h2>{t("editaccount.changepassword")}</h2>
          <div className="grid gap-2">
          <Input
            id="password"
            ref={passwordRef}
            name="password"
            placeholder={t("editaccount.oldpass")}
            type={visibleNewPass ? "text" : "password"}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <div className="flex items-center justify-start space-x-1">
            <Checkbox
                onClick={() => setVisibleOldPass(!visibleOldPass)}
                />
            <label
            htmlFor="showpassword"
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("editaccount.showpass")}
            </label>
          </div>
        </div>
          <div className="grid gap-2">
            <Input
              id="password"
              ref={passwordRef}
              name="password"
              placeholder={t("editaccount.newpass")}
              type={visibleNewPass ? "text" : "password"}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <div className="flex items-center justify-start space-x-1">
              <Checkbox
                  onClick={() => setVisibleNewPass(!visibleNewPass)}
                  />
              <label
              htmlFor="showpassword"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t("editaccount.showpass")}
              </label>
            </div>
          </div>
          <div className="grid gap-2">
          <Input
            id="password"
            ref={passwordRef}
            name="password"
            placeholder={t("editaccount.newpassconf")}
            type={visibleNewPass ? "text" : "password"}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <div className="flex items-center justify-start space-x-1">
            <Checkbox
                onClick={() => setVisibleConfPass(!visibleConfPass)}
                />
            <label
            htmlFor="showpassword"
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("editaccount.showpass")}
            </label>
          </div>
        </div>
          <Button
            className="w-fit"
            onClick={handleSubmitPass}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("editaccount.changepassword")}
          </Button>
        </div>
        <Button
          className="w-fit min-w-[200px]"
          variant="destructive"
          onClick={goBack}
        >
          {t("editaccount.back")}
        </Button>
        <Toaster />
      </div>
    </Layout>
  );
}

export default EditAccount;
