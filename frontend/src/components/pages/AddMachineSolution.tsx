import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Machine } from "@/services/Machine";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import { Icons } from "../foundations/icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
} from "@/lib/api";

function AddMachineSolution() {
  useAuthenticated();

  const [Name, SetName] = useState("");
  const [Solution, SetSolution] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function HandleSubmit() {
    setIsLoading(true);
    if (Name == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Please fill in a machine name",
      });
      setIsLoading(false);
    } else if (Solution == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Please fill in a solution",
      });
      setIsLoading(false);
    } else {
      let machines = await fetch(
        API_BASE_URL + "/api/machines",
        getBaseQueryRequest(),
      )
        .then((data) => data.json())
        .then((machines) =>
          machines.filter((machine: Machine) => machine.name == Name),
        );

      if (machines.length >= 1) {
        machines.map(
          (machine: Machine) => (
            (machine.solution = Solution),
            fetch(
              API_BASE_URL + "/api/Machines/" + machine.machineId,
              putBaseMutateRequest(JSON.stringify(machine)),
            )
          ),
        );

        if (machines.length == 1) {
          toast({
            variant: "default",
            title: "Succes!",
            description: machines.length + " solution added successfully.",
          });
          setIsLoading(false);
        } else if (machines.length > 1) {
          toast({
            variant: "default",
            title: "Succes!",
            description: machines.length + " solutions added successfully.",
          });
          setIsLoading(false);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          description: "No solutions added.",
        });
        setIsLoading(false);
      }
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
        onChange={(e) => SetName(e.currentTarget.value)}
      />
      <Textarea
        placeholder="Describe solution"
        onChange={(e) => SetSolution(e.currentTarget.value)}
      />
      <Button className="w-fit" onClick={HandleSubmit} disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Add machine solution
      </Button>
    </div>
  );
}

export default AddMachineSolution;
