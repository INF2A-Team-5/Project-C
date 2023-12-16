import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
} from "@/lib/api";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Department } from "@/services/Department";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Machine } from "@/services/Machine";

function AddMachine() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [DataLoaded, setDataLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (DataLoaded == false) {
    GetDepartments();
    setDataLoaded(true);
  }

  async function GetDepartments() {
    setDepartments(
      await fetch(
        API_BASE_URL + "/api/departments/",
        getBaseQueryRequest(),
      ).then((data) => data.json()),
    );
  }

  async function handleSubmit() {
    setIsLoading(true);
    const machine: Machine = await fetch(
      API_BASE_URL + "/api/machines",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((machines) => machines.find((mach: any) => mach.name == name));

    const dep: Department = await fetch(
      API_BASE_URL + "/api/departments",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((deps) =>
        deps.find((dep: Department) => dep.name.toLowerCase() == department),
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
    } else if (dep == undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Choose a department.", //choose a department
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
            departmentId: dep.departmentId,
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
    <div className="grid gap-2">
      <Input
        placeholder="Enter Machine Name"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {department
              ? departments.find(
                  (dep: Department) => dep.name.toLowerCase() == department,
                )?.name
              : "Select department..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search department..." />
            <CommandEmpty>No departments found.</CommandEmpty>
            <CommandGroup>
              {departments.map((dep) => (
                <CommandItem
                  key={dep.name}
                  value={dep.name}
                  onSelect={(currentValue) => {
                    setDepartment(
                      currentValue === department ? "" : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      department === dep.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {dep.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Textarea
        placeholder="Enter Description"
        onChange={(e) => setDescription(e.currentTarget.value)}
      ></Textarea>
      <Button className="w-fit" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Add Machine
      </Button>
    </div>
  );
}

export default AddMachine;
