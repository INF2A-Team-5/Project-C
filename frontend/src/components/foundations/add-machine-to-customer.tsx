import { MachineModel } from "../../types/MachineModel";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
  useQuery,
} from "../../lib/api";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "./icons";
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
import { DialogClose, DialogFooter } from "../ui/dialog";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

function AddMachineToCustomer({ setOpen }: { setOpen: (_: boolean) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const Id = localStorage.getItem("currentaccountID");
  const [machine, setMachine] = useState("");
  const [cusomterId, setCustomerID] = useState<number>();

  const navigate = useNavigate();

  useEffect(() => {
    if (cusomterId == undefined) {
      getCustomerId();
    }
  });
  async function getCustomerId() {
    var cust = await fetch(
      API_BASE_URL + "/api/Customers/getCustomer?AccountId=" + Id,
      getBaseQueryRequest(),
    ).then((data) => data.json());
    console.log(cust.customerId);
    setCustomerID(cust.customerId);
  }

  const { data } = useQuery<MachineModel[]>("/GetAllModels", {
    onError: () => {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.no_data_error"),
      });
    },
  });
  async function HandleSubmit() {
    if (cusomterId == undefined) {
      getCustomerId();
    }
    setIsLoading(true);
    var model = data?.find((mach) => mach.name.toLowerCase() === machine);
    try {
      await fetch(
        API_BASE_URL + "/api/Machines?Customer_Id=" + cusomterId,
        postBaseMutateRequest(
          JSON.stringify({
            modelId: model?.modelId,
            name: model?.name,
            description: model?.description,
            departmentId: model?.departmentId,
          }),
        ),
      );
      toast({
        variant: "default",
        title: t("toast.successtitle"),
        description: t("toast.machine_added"),
      });
      setIsLoading(false);
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.something_wrong_error"),
      });
      setIsLoading(false);
    }
  }
  return (
    <div className="grid gap-2">
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={menuOpen}
            className="w-[200px] justify-between"
          >
            {machine
              ? data!.find(
                  (mach: MachineModel) => mach.name.toLowerCase() == machine,
                )?.name
              : "Select Machine..."}
            <CaretDownIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search machine..." />
            <CommandEmpty>{t("machine.empty")}</CommandEmpty>
            <CommandGroup>
              {data
                ? data!.map((mach) => (
                    <CommandItem
                      key={mach.name}
                      value={mach.name}
                      onSelect={(currentValue) => {
                        setMachine(
                          currentValue === machine ? "" : currentValue,
                        );
                        setMenuOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          machine === mach.name ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {mach.name}
                    </CommandItem>
                  ))
                : null}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogFooter>
        <DialogClose>
          <Button variant="outline">{t("machine.close")}</Button>
        </DialogClose>
        <Button
          className="w-fit"
          variant="default"
          onClick={HandleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {t("misc.add_machine")}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default AddMachineToCustomer;
