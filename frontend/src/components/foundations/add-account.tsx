import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
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
import { CaretDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import React from "react";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { useTranslation } from "react-i18next";

function AddAccount({ setOpen }: { setOpen: (_: boolean) => void }) {
  const { t, i18n } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const { data } = useQuery<Department[]>("/api/departments", {
    onError: () => {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("no_data_error"),
      });
    },
  });

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
        title: t("toast.errortitle"),
        description: t("toast.username_exists_error"),
      });
      setIsLoading(false);
    } else if (username == "") {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.choose_username_error"),
      });
      setIsLoading(false);
    } else if (password == "") {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.choose_password_error"),
      });
      setIsLoading(false);
    } else if (password != confirmPassword) {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.passwords_dont_match_errors"),
      });
      setIsLoading(false);
    } else if (userType == "") {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.choose_type_error"),
      });
      setIsLoading(false);
    }
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
          title: t("toast.errortitle"),
          description: t("toast.something_wrong_error"),
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
            title: t("toast.successtitle"),
            description: t("toast.account_added"),
          });
          setIsLoading(false);
          setOpen(false);
        } catch (error) {
          console.log(error);
          toast({
            variant: "destructive",
            title: t("toast.errortitle"),
            description: t("toast.something_wrong_error"),
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
        placeholder={t("account.username")}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <Input
        id="new password"
        ref={passwordRef}
        name="password"
        placeholder={t("account.password")}
        type="password"
        // ●●●●●●●● als je circels wilt
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Input
        id="confirmed password"
        ref={passwordRef}
        name="password"
        placeholder={t("account.passwordconfirm")}
        type="password"
        // ●●●●●●●● als je circels wilt
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
      />
      <Select onValueChange={(value) => setUserType(value)}>
        <SelectTrigger>
          <SelectValue placeholder={t("account.typeselect")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Client">Client</SelectItem>
          <SelectItem value="ServiceEmployee">Service Employee</SelectItem>
        </SelectContent>
      </Select>
      {userType == "ServiceEmployee" ? (
        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={menuOpen}
              className="w-[200px] justify-between"
            >
              {department
                ? data!.find(
                    (dep: Department) => dep.name.toLowerCase() == department,
                  )?.name
                : t("account.selectdepartment")}
              <CaretDownIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={t("account.searchdepartment")} />
              <CommandEmpty>{t("account.nodepartment")}</CommandEmpty>
              <CommandGroup>
                {data!.map((dep) => (
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
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      ) : null}
      <DialogFooter>
        <DialogClose>
          <Button variant="outline">{t("account.close")}</Button>
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
          {t("account.add")}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default AddAccount;
