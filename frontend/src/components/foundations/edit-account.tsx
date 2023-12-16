import { useState } from "react";
import Settings from "./settings";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import Header from "./header";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Icons } from "./icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
} from "@/lib/api";
import { toast } from "../ui/use-toast";
import React from "react";
import { Toaster } from "../ui/toaster";

function EditAccount() {
  useAuthenticated();
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
  async function handleSubmitPhone() {
    setIsLoading(true);
    let currentaccount = await fetch(
      API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
      getBaseQueryRequest(),
    ).then((data) => data.json());
    if (phone == "")
    {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Please fill in a valid phone number",
      });
      setIsLoading(false);
    }
    else 
    {
      const data = {
        accountId: localStorage.getItem("Id"),
        name: currentaccount.name,
        password: currentaccount.password,
        phoneNumber: phone,
        class: currentaccount.class,
      };
      await fetch(
        API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
        putBaseMutateRequest(JSON.stringify(data)),
      );
      toast({
        variant: "default",
        title: "Succes!",
        description: "Phone number successfully editted",
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

    if (password !== confirmPass || oldPassword != currentaccount.password ) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Either your old password is incorrect or new password and confirmed password do not match",
      });
      setIsLoading(false);
    }
    else {
      const data = {
        accountId: localStorage.getItem("Id"),
        name: currentaccount.name,
        password: password,
        // phoneNumber: phone === "" ? currentaccount.phoneNumber : phone,
        class: currentaccount.class,
      };
      await fetch(
        API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
        putBaseMutateRequest(JSON.stringify(data)),
      );
      toast({
        variant: "default",
        title: "Succes!",
        description: "Password successfully editted",
      });
      setIsLoading(false);
    }
    // also need another function for changing phone number
  }

  return (
    <div className="px-24 text-left">
      <div className="flex justify-center pb-16 pt-10">
        <Header></Header>
      </div>
      <div className="grid gap-12">
        <div className="grid gap-2">
          <h1 className="text-4xl font-medium">Edit Account</h1>
          <Label>Make changes to your account.</Label>
          <Separator className="my-4" />
          <h2>Change Phone Number</h2>
          <Input
            name="username"
            placeholder="Enter Phone Number"
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
          <Button className="w-fit" onClick={handleSubmitPhone} disabled={isLoading}>
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
          <Button className="w-fit" onClick={handleSubmitPass} disabled={isLoading}>
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
    </div>
  );
}

export default EditAccount;
