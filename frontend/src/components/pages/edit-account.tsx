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

function EditAccount() {
  // useAuthenticated();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState("");

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
      return "Enter Phone Number";
    } else {
      return "Current Phone Number: " + currentaccount.phoneNumber;
    }
  }

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
        description: "Phone number changed succesfully.",
      });
      setIsLoading(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Phone number is not valid.",
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
          "Either your old password is incorrect or new password and confirmed password do not match",
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
        description: "Password successfully editted",
      });
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div>
          <h1 className="text-3xl font-medium">Edit Account</h1>
          <Label>Make changes to your account.</Label>
        </div>
        <div className="grid gap-2">
          <h2>Change Phone Number</h2>
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
            Change Phone Number
          </Button>
        </div>
        <div className="grid gap-2">
          <h2>Change Password</h2>
          <Input
            id="old password"
            ref={passwordRef}
            name="old password"
            placeholder="Old password"
            type="password"
            // ●●●●●●●● als je circels wilt
            onChange={(e) => setOldPassword(e.currentTarget.value)}
          />
          <Input
            id="new password"
            ref={passwordRef}
            name="password"
            placeholder="New password"
            type="password"
            // ●●●●●●●● als je circels wilt
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Input
            id="confirmed password"
            ref={passwordRef}
            name="password"
            placeholder="Confirm new password"
            type="password"
            // ●●●●●●●● als je circels wilt
            onChange={(e) => setConfirmPass(e.currentTarget.value)}
          />
          <Button
            className="w-fit"
            onClick={handleSubmitPass}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Change Password
          </Button>
        </div>
        <Button
          className="w-fit min-w-[200px]"
          variant="destructive"
          onClick={goBack}
        >
          Back
        </Button>
        <Toaster />
      </div>
    </Layout>
  );
}

export default EditAccount;
