import { useState } from "react";
import Settings from "../foundations/settings";
import { Ticket } from "../../services/Ticket";
import Table from "../foundations/table";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Toaster } from "../ui/toaster";
import { API_BASE_URL, getBaseQueryRequest, postBaseMutateRequest } from "@/lib/api";
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
import AddMachine from "./addMachine";
import { Textarea, TextareaHint } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Icons } from "../foundations/icons";

function Machines() {
  useAuthenticated();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [AllMachines, SetAllMachines] = useState<Machine[]>([]);
  const [LoadData, SetData] = useState<Boolean>(false);
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  if (LoadData == false) {
    GetData();
    SetData(true);
  }

  async function GetData() {
    SetAllMachines(
      await fetch(API_BASE_URL + "/api/Machines", getBaseQueryRequest()).then(
        (data) => data.json(),
      ),
    );
  }
  async function handleSubmit() {
    setIsLoading(true);
    const machine = await fetch(
      API_BASE_URL + "/api/machines",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((machines) => machines.find((mach: any) => mach.name == name));

    setDepartment(
      await fetch(API_BASE_URL + "/api/departments/", getBaseQueryRequest())
        .then((data) => data.json())
        .then((dep) => dep.find((depar: any) => depar.name == department)),
    );

    if (machine !== undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Machine already exists.",
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
      fetch(
        API_BASE_URL + "/api/machines",
        postBaseMutateRequest(
          JSON.stringify({
            name: name,
            description: description,
            department: department,
          }),
        ),
      ).then((response) => response.json());

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
    <>
      <Navbar />
      <Settings></Settings>
      <div className="grid gap-8 px-24 text-left">
        <div className="h-24" />
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-medium">Machines</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Add machine</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Machine</DialogTitle>
                <TextareaHint>Create new machines</TextareaHint>
              </DialogHeader>
              <DialogDescription>
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
                  
                </div>
                {/* Restarting the machine?
                <br />
                Checking if the sensors are blocked?
                <br />
                Checking for any stuck items?
                <br /> */}
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Add machine
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* <Button variant="outline" className="w-fit" >dddddddddddddd</Button> */}
        <div className="grid gap-12">
          <Table data={AllMachines} columns={machineColumns} />
          <div className="h-44"></div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Machines;
