import { useState } from "react";
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

function EditAccount() {
  useAuthenticated();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit() {
    setIsLoading(true);

    let currentaccount = await fetch(
      API_BASE_URL + "/api/accounts/",
      getBaseQueryRequest(),
    ).then((data) => data.json());

    if (password !== confirmPass) {
      alert("password and confirm password need to match");
      setIsLoading(false);
    } else {
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

      setIsLoading(false);
    }

    //add logic to check if new password and confirm password are the same, maybe also not the same as the old password

    // also need another function for changing phone number

    // need accounts to be connected to current user so i can change the phone number of the current user
  }
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
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
            placeholder="Enter Phone Number"
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
          <Button className="w-fit" onClick={handleSubmit} disabled={isLoading}>
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
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Input
            name="password"
            placeholder="Confirm New Password"
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
