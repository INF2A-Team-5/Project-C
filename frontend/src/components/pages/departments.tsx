import { useState } from "react";
import Table from "../foundations/table";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
  useQuery,
} from "@/lib/api";
import { departmentColumns } from "@/services/Columns";
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
import { Input } from "../ui/input";
import { Department } from "@/types/Department";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";
import { TextareaHint } from "../ui/textarea";
import Layout from "../layout";

function Departments() {
  useAuthenticated();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, isFetching } = useQuery<Department[]>("/api/departments", {
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
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Departments</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" disabled={isFetching}>
                Add department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add department</DialogTitle>
                <TextareaHint>Create Departments for new services</TextareaHint>
              </DialogHeader>
              <DialogDescription>
                <Input
                  placeholder="Enter Department Name"
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">Close</Button>
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
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={departmentColumns} />
          ) : (
            <div className="flex h-[20rem] w-full items-center justify-center">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            </div>
          )}
          <div className="h-44"></div>
        </div>
      </div>
    </Layout>
  );
}

export default Departments;
