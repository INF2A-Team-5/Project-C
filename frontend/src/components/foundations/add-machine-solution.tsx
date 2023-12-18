import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Machine } from "@/types/Machine";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import { Icons } from "./icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
} from "@/lib/api";

function AddMachineSolution() {
  useAuthenticated();

  const [name, setName] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setIsLoading(true);
    if (name == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Please fill in a machine name",
      });
      setIsLoading(false);
    } else if (solution == "") {
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
          machines.filter((machine: Machine) => machine.name == name),
        );

      if (machines.length >= 1) {
        machines.map(
          (machine: Machine) => (
            (machine.solution = solution),
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
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Textarea
        placeholder="Describe solution"
        onChange={(e) => setSolution(e.currentTarget.value)}
      />
      <Button className="w-fit" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Add machine solution
      </Button>
    </div>
  );
}

export default AddMachineSolution;
