import { useState } from "react";
import Settings from "../foundations/settings";
import { Ticket } from "../../services/Ticket";
import Table from "../foundations/table";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Toaster } from "../ui/toaster";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
  putBaseMutateRequest,
} from "@/lib/api";
import { Machine } from "@/services/Machine";

import Navbar from "../foundations/navbar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { machineColumns } from "@/services/Columns";
import { Textarea, TextareaHint } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Icons } from "../foundations/icons";

function Solutions() {
  useAuthenticated();
  const [name, setName] = useState("");
  const [solution, setSolution] = useState("");
  const [allSolutions, setAllSolutions] = useState("");
  const [loadData, setData] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  if (loadData == false) {
    getData();
    setData(true);
  }

  async function getData(){
    setAllSolutions(
        await fetch(API_BASE_URL + "/api/Solutions", getBaseQueryRequest())
          .then((data) => data.json())
      );
  }



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
            (machine.solution = allSolutions),
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
    <>
      <Navbar />
      <Settings></Settings>
      <div className="grid gap-8 px-24 text-left">
        <div className="h-24" />
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-medium">Solutions</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Add solution</Button>
            </DialogTrigger>

            <DialogContent className="min-w-fit">
              <DialogHeader>
                <DialogTitle>Add solution</DialogTitle>
                <TextareaHint>Create new solutions</TextareaHint>
              </DialogHeader>
              <DialogDescription>
                <div className="grid gap-2">
                  <Input
                    placeholder="Enter Machine Name"
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                  <Textarea
                    placeholder="Describe solution"
                    onChange={(e) => setSolution(e.currentTarget.value)}
                  />
                </div>
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Add solution
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-12">
          <div className="h-44"></div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Solutions;
