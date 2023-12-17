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

function AddAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [userType, setUserType] = useState("Client");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [department, setDepartment] = useState("");
  const [deparmentList, setDepartmentList] = useState<Department[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  if (deparmentList.length == 0) {
    getDepartments();
  }

  async function getDepartments() {
    let deps = await fetch(
      API_BASE_URL + "/api/departments/",
      getBaseQueryRequest(),
    ).then((data) => data.json());

    setDepartmentList(deps);
  }

  async function handleSubmit() {
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
    }

    // WAAR IS CLASS CHECKING?
    else {
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

      let acc: any = await fetch(
        API_BASE_URL + "/api/accounts",
        getBaseQueryRequest(),
      )
        .then((data) => data.json())
        .then((accounts) =>
          accounts.find((acc: Account) => acc.name == username),
        );

      let dep: any = await fetch(
        API_BASE_URL + "/api/departments",
        getBaseQueryRequest(),
      )
        .then((data) => data.json())
        .then((deps) =>
          deps.find((dep: Department) => dep.name.toLowerCase() == department),
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
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Something went wrong!",
        });
      }
      // navigate("/admin");
      setIsLoading(false);
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
      <Select value={userType} onValueChange={(value) => setUserType(value)}>
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
        // <Select value={department} onValueChange={(value) => setDepartment(value)}>
        //   <SelectTrigger>
        //     <SelectValue placeholder="Select a Department" />
        //   </SelectTrigger>
        //   <SelectContent>
        //     {deparmentList.map((dep) => (
        //       <SelectItem key={dep} value={dep}>{dep}</SelectItem>
        //     ))}
        //   </SelectContent>
        // </Select>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {department
                ? deparmentList.find(
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
                {deparmentList.map((dep) => (
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
      <Button
        className="w-fit"
        variant="default"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Add Account
      </Button>
    </div>
  );
}

export default AddAccount;
