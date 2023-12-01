import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Settings from "../foundations/settings";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";

function EditAccount() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    let currentaccount = await fetch(
      "http://localhost:5119/api/accounts/" + localStorage.getItem("Id"),
      {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());

    if (password !== confirmPass) {
      alert("password and confirm password need to match");
    }

    const data = {
      accountId: localStorage.getItem("Id"),
      name: currentaccount.name,
      password: password,
      class: currentaccount.class,
    };

    await fetch(
      "http://localhost:5119/api/accounts/" + localStorage.getItem("Id"),
      {
        method: "PUT",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    //add logic to check if new password and confirm password are the same, maybe also not the same as the old password

    // also need another function for changing phone number

    // need accounts to be connected to current user so i can change the phone number of the current user
  }

  return (
    <div>
      <h2>Change Phone Number</h2>
      <div>
        <Input
          name="username"
          placeholder="Enter Phone Number"
          onChange={(e) => setPhone(e.currentTarget.value)}
        />
      </div>
      <h3></h3>
      <Button onClick={handleSubmit}>Change Phone Number</Button>
      <h3></h3>
      <h2>Change Password</h2>
      <div>
        <Input
          name="password"
          placeholder="Enter New Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <h3></h3>
      <div>
        <Input
          name="password"
          placeholder="Confirm New Password"
          onChange={(e) => setConfirmPass(e.currentTarget.value)}
        />
      </div>
      <br />
      <Settings></Settings>
      <Button onClick={handleSubmit}>Change Password</Button>
      <h3></h3>
      <Button
        variant="destructive"
        onClick={() => (window.location.href = "/tickets")}
      >
        Back
      </Button>
    </div>
  );
}

export default EditAccount;
