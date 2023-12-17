import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";
import { Icons } from "./icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
  useQuery,
} from "@/lib/api";
import { Department } from "@/types/Department";
import { Account } from "@/types/Account";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { DialogClose, DialogFooter } from "../ui/dialog";

function AddAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);

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
    console.log(userType);

    setIsLoading(true);
    const account = await fetch(
      API_BASE_URL + "/api/accounts",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((accounts) => accounts.find((acc: any) => acc.name == username));

    if (account !== undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Username already exists.",
      });
      setIsLoading(false);
    } else if (username == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a username.",
      });
      setIsLoading(false);
    } else if (password == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a password.",
      });
      setIsLoading(false);
    } else if (password != confirmpassword) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Password and confirmed password need to match.",
      });
      setIsLoading(false);
    } else if (userType == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Please select a user type.",
      });
      setIsLoading(false);
    }
    // WAAR IS CLASS CHECKING?
    else {
      try {
        await fetch(
          API_BASE_URL + "/api/accounts",
          postBaseMutateRequest(
            JSON.stringify({
              name: username,
              password: password,
              class: userType,
            }),
          ),
        ).then((response) => response.json());
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Something went wrong!",
        });
        setIsLoading(false);
      }
      let acc: any = await fetch(
        API_BASE_URL + "/api/accounts",
        getBaseQueryRequest(),
      )
        .then((data) => data.json())
        .then((accounts) =>
          accounts.find((acc: Account) => acc.name == username),
        );
      if (acc.class != "Client") {
        let dep: any = await fetch(
          API_BASE_URL + "/api/departments",
          getBaseQueryRequest(),
        )
          .then((data) => data.json())
          .then((deps) =>
            deps.find(
              (dep: Department) => dep.name.toLowerCase() == department,
            ),
          );

        try {
          await fetch(
            API_BASE_URL + "/api/employees",
            postBaseMutateRequest(
              JSON.stringify({
                departmentId: dep.departmentId,
                accountId: acc.accountId,
              }),
            ),
          );
          toast({
            variant: "default",
            title: "Succes!",
            description: "Account added successfully.",
          });
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          toast({
            variant: "destructive",
            title: "Error!",
            description: "Something went wrong!",
          });
          setIsLoading(false);
        }
      }
      // navigate("/admin");
    }
  }

  return (
    <div className="grid gap-2">
      <Input
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <Input
        id="new password"
        ref={passwordRef}
        name="password"
        placeholder="Enter password"
        type="password"
        // ●●●●●●●● als je circels wilt
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Input
        id="confirmed password"
        ref={passwordRef}
        name="password"
        placeholder="Confirm password"
        type="password"
        // ●●●●●●●● als je circels wilt
        onChange={(e) => setconfirmPassword(e.currentTarget.value)}
      />
      <Select onValueChange={(value) => setUserType(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a User Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Client">Client</SelectItem>
          <SelectItem value="ServiceEmployee">Service Employee</SelectItem>
        </SelectContent>
      </Select>
      {userType == "ServiceEmployee" ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {department
                ? data!.find(
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
                {data!.map((dep) => (
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
      ) : null}
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
          Add account
        </Button>
      </DialogFooter>
    </div>
  );
}

export default AddAccount;
