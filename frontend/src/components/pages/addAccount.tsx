import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";

function AddAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [userType, setUserType] = useState("Client");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setIsLoading(true);
    const account = await fetch("http://localhost:5119/api/accounts", {
      method: "GET",
      headers: {
        Authorization: "bearer " + localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
    })
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
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("Token"),
        },
        body: JSON.stringify({
          name: username,
          password: password,
          class: userType,
        }),
      };
      fetch("http://localhost:5119/api/accounts", requestOptions).then(
        (response) => response.json()
      );

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
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <Input
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Input
        placeholder="Confirm Password"
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
