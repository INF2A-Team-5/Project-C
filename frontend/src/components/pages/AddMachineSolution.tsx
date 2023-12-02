import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Settings from "../foundations/settings";
import { Machine } from "@/services/Machine";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";


function AddMachineSolution() {

    useAuthenticated();

  const [Machines, SetMachines] = useState<Machine[]>([]);
  const [Name, SetName] = useState("");
  const [Solution, SetSolution] = useState("");
  const [TotalChanged, SetTotalChanged] = useState(Number);
    const navigate = useNavigate();


  async function HandleSubmit() {
    SetMachines(
      await fetch("http://localhost:5119/api/Machines", {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
        },
      }).then((data) => data.json())
    );

    Machines.forEach(async function (machine) {
      if (machine.name == Name) {
        machine.solution = Solution;
        await fetch("http://localhost:5119/api/Machines/" + machine.machineId, {
          method: "PUT",
          headers: {
            Authorization: "bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(machine),
        });
        SetTotalChanged(TotalChanged + 1);
      }
    });
    if (TotalChanged == 1) {
      alert(TotalChanged + "solution added successfully");
    } else if (TotalChanged > 1) {
      alert(TotalChanged + "solutions add successfully");
    } else {
      alert("No solutions added");
    }
    switch (localStorage.getItem("Class")) {
        // case "Client":
        //   navigate("/tickets");
        //   break;
        case "Admin":
          navigate("/admin");
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
    </div>
  );
}

export default AddMachineSolution;
