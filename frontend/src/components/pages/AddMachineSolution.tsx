import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Settings from "../foundations/settings";
import { Machine } from "@/services/Machine";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function AddMachineSolution() {
  useAuthenticated();

  const [Machines, SetMachines] = useState<Machine[]>([]);
  const [Name, SetName] = useState("");
  const [Solution, SetSolution] = useState("");
  const navigate = useNavigate();

  async function HandleSubmit() {
    SetMachines(
      await (fetch("http://localhost:5119/api/Machines", {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
        },
      }).then((data) => data
        .json()
        .then((machines) => machines.filter((mach: Machine) => mach.name == Name))))
    );
    if (Machines != null) {
      console.log(Name);
       Machines.map((machine) => (
        machine.solution = Solution,
        fetch("http://localhost:5119/api/Machines/" + machine.machineId, {
          method: "PUT",
          headers: {
            Authorization: "bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(machine),
        })
      ))
      // for (let machine in Machines) {
      //   machArr = machine.
      //   machine.solution = Solution;
      //   await fetch("http://localhost:5119/api/Machines/" + machine.machineId, {
      //     method: "PUT",
      //     headers: {
      //       Authorization: "bearer " + localStorage.getItem("Token"),
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(machine),
      //   });
      // });
    }
    if (Machines.length == 1) {
      toast({
        variant: "default",
        title: "Succes!",
        description:
        Machines.length + " solution added successfully.",
      })
      // alert(TotalChanged + " solution added successfully");
    } else if (Machines.length > 1) {
      toast({
        variant: "default",
        title: "Succes!",
        description:
        Machines.length + " solutions added successfully.",
      })
      // alert(TotalChanged + " solutions added successfully");
    } else {
      toast({
        variant: "destructive",
        title: "Error!",
        description: " No solutions added.",
      })
      // alert("No solutions added");
    }
    console.log(Machines.length);
    switch (localStorage.getItem("Class")) {
      // case "Client":
      //   navigate("/tickets");
      //   break;
      case "Admin":
        navigate("/add-machine-solution");
        break;
      case "ServiceEmployee":
        navigate("/serviceEmployee");
        break;
    }
  }

  return (
    <div>
      <Settings></Settings>
      <h2>Name</h2>
      <div>
        <Input
          name="username"
          placeholder="Enter Machine Name"
          onChange={(e) => SetName(e.currentTarget.value)}
        />
      </div>
      <h2>Solution</h2>
      <div>
        <Input
          name="password"
          placeholder="Describe solution"
          onChange={(e) => SetSolution(e.currentTarget.value)}
        />
      </div>
      <h3></h3>
      <Button onClick={HandleSubmit}>Add machine solution</Button>
      <h3></h3>
      <Toaster />
    </div>
  );
}

export default AddMachineSolution;
