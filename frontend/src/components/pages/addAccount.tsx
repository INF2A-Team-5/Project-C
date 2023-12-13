import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
} from "@/lib/api";

function AddAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [userType, setUserType] = useState("Client");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmpasswordRef = React.useRef<HTMLInputElement>(null);
  const userTypeRef = React.useRef<HTMLInputElement>(null);
  
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (event.currentTarget === usernameRef.current) {
        passwordRef.current?.focus();
      } else if (event.currentTarget === passwordRef.current) {
        confirmpasswordRef.current?.focus();
      } else if (event.currentTarget === confirmpasswordRef.current) {
        userTypeRef.current?.focus();
      } else if (event.currentTarget === userTypeRef.current) {
        handleSubmit();
      }
    }
  };

  async function handleSubmit() {
    setIsLoading(true);
    const account = await fetch(
      API_BASE_URL + "/api/accounts",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((accounts) => accounts.find((acc: any) => acc.name == username));

    if (account !== undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Username already exists.",
      });
      setIsLoading(false);
    } else if (username == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a username.",
      });
      setIsLoading(false);
    } else if (password == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a password.",
      });
      setIsLoading(false);
    } else if (password != confirmpassword) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Password and confirmed password need to match.",
      });
      setIsLoading(false);
    }

    // WAAR IS CLASS CHECKING?
    else {
      fetch(
        API_BASE_URL + "/api/accounts",
        postBaseMutateRequest(
          JSON.stringify({
            name: username,
            password: password,
            class: userType,
          }),
        ),
      ).then((response) => response.json());

      toast({
        variant: "default",
        title: "Succes!",
        description: "Account added successfully.",
      });
      // navigate("/admin");
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <Input
        ref={usernameRef}
        name="username"
        placeholder="Username"
        onKeyDown={handleEnter}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <Input
        ref={passwordRef}
        name="password"
        placeholder="Password"
        type="password"
        onKeyDown={handleEnter}
        // ●●●●●●●● als je circels wilt
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Input
        ref={confirmpasswordRef}
        name="confirm password"
        placeholder="Confirm Password"
        type="password"
        onKeyDown={handleEnter}
        // ●●●●●●●● als je circels wilt
        onChange={(e) => setconfirmPassword(e.currentTarget.value)}
      />
      <Select value={userType} onValueChange={(value) => setUserType(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a User Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Client">Client</SelectItem>
          <SelectItem value="ServiceEmployee">Service Employee</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="w-fit"
        variant="default"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Add Account
      </Button>
    </div>
  );
}

export default AddAccount;
