import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Icons } from "./icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
} from "@/lib/api";
import { toast } from "../ui/use-toast";
import { DialogClose, DialogFooter } from "../ui/dialog";

function AddDepartment() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      try {
        fetch(
          API_BASE_URL + "/api/departments",
          postBaseMutateRequest(JSON.stringify({ name: name })),
        );
        toast({
          variant: "default",
          title: "Succes!",
          description: "Account added successfully.",
        });
        setIsLoading(false);
      } catch {
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Something went wrong.",
        });
        setIsLoading(false);
      }
    }
  }
  return (
    <div className="grid gap-2">
      <Input
        placeholder="Enter Department Name"
        onChange={(e) => setName(e.currentTarget.value)}
      />
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
    </div>
  );
}

export default AddDepartment;
