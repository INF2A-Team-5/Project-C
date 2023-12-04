import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

function AddMachine() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    const machine = await fetch(
      "http://localhost:5119/api/machines/" + localStorage.getItem("Id"),
      {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
        },
      }
    )
      .then((data) => data.json())
      .then((machines) => machines.find((mach: any) => mach.name == name));

    if (machine !== undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Machine name already exists.",
      });
    } else if (name == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a name.",
      });
    } else if (description == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a description.",
      });
    } 
    else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("Token"),
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      };
      fetch("http://localhost:5119/api/machines", requestOptions).then(
        (response) => response.json()
      );
      toast({
        variant: "default",
        title: "Succes!",
        description: "Machine added successfully.",
      });
      navigate("/admin");
    }
  }

  return (
    <div className="grid gap-2">
      <Input
        placeholder="Enter Machine Name"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Textarea
        placeholder="Enter Description"
        onChange={(e) => setDescription(e.currentTarget.value)}
      ></Textarea>
      <Button className="w-fit" onClick={handleSubmit}>
        Add Machine
      </Button>
    </div>
  );
}

export default AddMachine;
