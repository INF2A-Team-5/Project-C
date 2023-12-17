import { useState } from "react";
import Table from "../foundations/table";
import { Toaster } from "../ui/toaster";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
  useQuery,
} from "@/lib/api";
import { Machine } from "@/types/Machine";
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
import { useNavigate } from "react-router-dom";
import { machineColumns } from "@/services/Columns";
import { Textarea, TextareaHint } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Icons } from "../foundations/icons";
import Layout from "../layout";

function Machines() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const isClient = localStorage.getItem("Class") == "Client";
  const apiUrl = isClient
    ? "/GetMachinesPerAccount?accountId=" + localStorage.getItem("Id")
    : "/api/machines";
  const { data, isFetching } = useQuery<Machine[]>(apiUrl, {
    onError: () => {
      toast({
        variant: "destructive",
        title: "Whomp whomp:(",
        description: "U get no data",
      });
    },
  });

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
        description: "Enter a department.",
      });
      setIsLoading(false);
    } else if (department == undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Department does not exist.",
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
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Machines</h1>
          {localStorage.getItem("Class") == "Admin" ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" disabled={isFetching}>
                  Add machine
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add machine</DialogTitle>
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
          ) : null}
        </div>
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={machineColumns} />
          ) : (
            <div className="flex h-[20rem] w-full items-center justify-center">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            </div>
          )}
          <div className="h-44"></div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}

export default Machines;
