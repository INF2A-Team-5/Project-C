import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
  useQuery,
} from "@/lib/api";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Department } from "@/types/department";
import { Machine } from "@/types/machine";
import { DialogClose, DialogFooter } from "../ui/dialog";

function AddMachine() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const { data } = useQuery<Department[]>("/api/departments", {
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
        description: "Choose a department.",
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
      setName("");
      setDescription("");
    }
  }

  return (
    <div className="grid gap-2">
      <Input
        placeholder="Enter Machine Name"
        onChange={(e) => setName(e.currentTarget.value)}
        value={name}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {data
              ? department
                ? data.find(
                    (dep: Department) => dep.name.toLowerCase() == department,
                  )?.name
                : "Select department..."
              : null}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search department..." />
            <CommandEmpty>No departments found.</CommandEmpty>
            <CommandGroup>
              {data
                ? data.map((dep) => (
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
                  ))
                : null}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Textarea
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      ></Textarea>
      <DialogFooter>
        <DialogClose>
          <Button variant="outline">Close</Button>
        </DialogClose>
        <Button className="w-fit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Add Machine
        </Button>
      </DialogFooter>
    </div>
  );
}

export default AddMachine;
