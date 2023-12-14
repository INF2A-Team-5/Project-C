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
} from "@/lib/api";
import { departmentColumns, ticketColumns } from "@/services/Columns";
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
import { Input } from "../ui/input";
import { Department } from "@/services/Department";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";

function Departments() {
  useAuthenticated();
  const [name, setName] = useState("");
  const [loadData, setData] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  const navigate = useNavigate();
  if (loadData == false) {
    getData();
    setData(true);
  }

  async function getData() {
    setAllDepartments(
      await fetch(
        API_BASE_URL + "/api/Departments",
        getBaseQueryRequest(),
      ).then((data) => data.json()),
    );
  }

  async function handleSubmit() {
    setIsLoading(true);
    const department = await fetch(
      API_BASE_URL + "/api/departments",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((departments) => departments.find((dep: any) => dep.name == name));

    if (department !== undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Department already exists",
      });
      setIsLoading(false);
    } else if (name == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a department name",
      });
      setIsLoading(false);
    } else {
      fetch(
        API_BASE_URL + "/api/departments",
        postBaseMutateRequest(JSON.stringify({ name: name })),
      ).then((data) => data.json());
      toast({
        variant: "default",
        title: "Succes!",
        description: "Account added successfully.",
      });
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <Settings></Settings>
      <div className="grid gap-8 px-24 text-left">
        <div className="h-24" />
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-medium">Departments</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Add Department</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Before you make a ticket, have you tried?
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <Input
                  placeholder="Enter Department Name"
                  onChange={(e) => setName(e.currentTarget.value)}
                />
                
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">No, I haven't.</Button>
                </DialogClose>
                <Button
                  className="w-fit"
                  variant="default"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Add Department
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* <Button variant="outline" className="w-fit" >dddddddddddddd</Button> */}
        <div className="grid gap-12">
          <Table data={allDepartments} columns={departmentColumns} />
          <div className="h-44"></div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Departments;
