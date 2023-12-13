import { useState } from "react";
import Settings from "../foundations/settings";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import Header from "../foundations/header";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";
import { useEffect } from "react";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
} from "@/lib/api";

function EditAccount() {
  useAuthenticated();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const phoneRegex: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
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

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  function validatePhone() {
    return phoneRegex.test(phone);
  }

  async function hasPhoneConnected() : Promise<string>{
    let currentaccount = await fetch(
      API_BASE_URL + "/api/accounts/",
      getBaseQueryRequest(),
    )
    .then((data) => data.json())
    .then((accounts) => accounts.find((acc: any) => acc.accountId == localStorage.getItem("Id")));
    
    if (currentaccount.phoneNumber == null) {
      return "Enter Phone Number";
    } else {
      return "Current Phone Number: " + currentaccount.phoneNumber;
    }
  }

  async function handlePhoneSubmit() {
    setIsLoading(true);

    let currentaccount = await fetch(
      API_BASE_URL + "/api/accounts/",
      getBaseQueryRequest(),
    )
    .then((data) => data.json())
    .then((accounts) => accounts.find((acc: any) => acc.accountId == localStorage.getItem("Id")));
    
    if (validatePhone() == true) {
      currentaccount.phoneNumber = phone;

      await fetch(
        API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
        putBaseMutateRequest(JSON.stringify(currentaccount),),
      )

      toast({
        variant: "default",
        title: "Succes!",
        description: "Phone number changed succesfully.",
      });
      setIsLoading(false);
    } else{
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Phone number is not valid.",
      });
      setIsLoading(false);
    }
  }

  async function handleSubmit() {
    setIsLoading(true);

    let currentaccount = await fetch(
      API_BASE_URL + "/api/accounts/",
      getBaseQueryRequest(),
    )
    .then((data) => data.json())
    .then((accounts) => accounts.find((acc: any) => acc.accountId == localStorage.getItem("Id")));
    
    if (password !== confirmPass) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Password and confirmed password need to match.",
      });
      setIsLoading(false);
    } else {
      currentaccount.password = password;

      await fetch(
        API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
        putBaseMutateRequest(JSON.stringify(currentaccount)),
      )

      toast({
        variant: "default",
        title: "Succes!",
        description: "Password changed successfully.",
      });

      setIsLoading(false);
    }

  }
  return (
    <div className="px-24 text-left">
      <Settings></Settings>
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
            placeholder={phonePlaceholder}
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
          <Button className="w-fit" onClick={handlePhoneSubmit} disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Change Phone Number
          </Button>
        </div>
        <div className="grid gap-2">
          <h2>Change Password</h2>
          <Input
            name="password"
            placeholder="Enter New Password"
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Input
            name="password"
            placeholder="Confirm New Password"
            type="password"
            onChange={(e) => setConfirmPass(e.currentTarget.value)}
          />
          <Button className="w-fit" onClick={handleSubmit} disabled={isLoading}>
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
      </div>
    </div>
  );
}

export default EditAccount;
