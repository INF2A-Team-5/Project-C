import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";
import {
  API_BASE_URL,
  putBaseMutateRequest,
  getBaseQueryRequest,
} from "@/lib/api";

function AddMachine() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setIsLoading(true);
    const machine = await fetch(
      API_BASE_URL + "/api/machines" + getBaseQueryRequest,
    )
      .then((data) => data.json())
      .then((machines) => machines.find((mach: any) => mach.name == name));

    // const machine = await fetch(
    //   "http://localhost:5119/api/machines/" + localStorage.getItem("Id"),
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: "bearer " + localStorage.getItem("Token"),
    //     },
    //   }
    // )
    //   .then((data) => data.json())
    //   .then((machines) => machines.find((mach: any) => mach.name == name));

    const departments = await fetch(
      API_BASE_URL + "/api/departments" + getBaseQueryRequest,
    )
      .then((data) => data.json())
      .then((dep) => dep.find((depar: any) => depar.name == department));
    // const departments = await fetch("http://localhost:5119/api/departments/", {
    //   method: "GET",
    //   headers: {
    //     Authorization: "bearer " + localStorage.getItem("Token"),
    //   },
    // })
    //   .then((data) => data.json())
    //   .then((dep) => dep.find((depar: any) => depar.name == department));

    if (machine !== undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Machine name already exists.",
      });
      setIsLoading(false);
    } else if (name == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a name.",
      });
      setIsLoading(false);
    } else if (department == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a department.", //choose a department
      });
      setIsLoading(false);
    } else if (department == undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Department does not exist.", //choose a department
      });
      setIsLoading(false);
    } else if (description == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a description.",
      });
      setIsLoading(false);
    } else {
      fetch(API_BASE_URL + "/api/machines" + putBaseMutateRequest, {
        body: JSON.stringify({
          name: name,
          description: description,
          department: department,
        }),
      }).then((response) => response.json());

      // const requestOptions = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "bearer " + localStorage.getItem("Token"),
      //   },
      //   body: JSON.stringify({
      //     name: name,
      //     description: description,
      //     department: department,
      //   }),
      // };
      // fetch("http://localhost:5119/api/machines", requestOptions).then(
      //   (response) => response.json(),
      // );
      toast({
        variant: "default",
        title: "Succes!",
        description: "Machine added successfully.",
      });
      setIsLoading(false);
      switch (localStorage.getItem("Class")) {
        case "Admin":
          navigate("/admin");
          break;
        case "ServiceEmployee":
          navigate("/serviceEmployee");
          break;
      }
    }
  }

  return (
    <div className="grid gap-2">
      <Input
        placeholder="Enter Machine Name"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Input
        placeholder="Enter Department Name"
        onChange={(e) => setDepartment(e.currentTarget.value)}
      />
      <Textarea
        placeholder="Enter Description"
        onChange={(e) => setDescription(e.currentTarget.value)}
      ></Textarea>
      <Button className="w-fit" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Add Machine
      </Button>
    </div>
  );
}

export default AddMachine;
