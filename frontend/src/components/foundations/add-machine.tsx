import { useEffect, useState } from "react";
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

import { cn } from "@/lib/utils";
import { Department } from "@/types/Department";
import { Machine } from "@/types/Machine";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { CaretDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

function AddMachine({ setOpen }: { setOpen: (_: boolean) => void }) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      API_BASE_URL + "/api/MachineModels?AccountId=" + localStorage.getItem("Id"),
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
        API_BASE_URL + "/api/MachineModels",
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
        description: "Machine: " + name + " added successfully.",
      });
      setIsLoading(false);
      setOpen(false);
      setName("");
      setDescription("");
    }
  }

  return (
    <div className="grid gap-2">
      <Input
        placeholder={t("machine.inputname")}
        onChange={(e) => setName(e.currentTarget.value)}
        value={name}
      />
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={menuOpen}
            className="w-[200px] justify-between"
          >
            {data
              ? department
                ? data.find(
                    (dep: Department) => dep.name.toLowerCase() == department,
                  )?.name
                : t("machine.select")
              : null}
            <CaretDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={t("machine.search")} />
            <CommandEmpty>{t("machine.empty")}</CommandEmpty>
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
                        setMenuOpen(false);
                      }}
                    >
                      <CheckIcon
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
        placeholder={t("machine.description")}
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      ></Textarea>
      <DialogFooter>
        <DialogClose>
          <Button variant="outline">{t("machine.close")}</Button>
        </DialogClose>
        <Button className="w-fit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {t("machine.add")}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default AddMachine;
