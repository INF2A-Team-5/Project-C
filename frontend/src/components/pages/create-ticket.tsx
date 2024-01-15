import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";
import { Textarea, TextareaHint } from "../ui/textarea";
import { Label } from "../ui/label";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Icons } from "../foundations/icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
} from "@/lib/api";
import { useTranslation } from "react-i18next";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import Layout from "../layout";
import { MachineInfoDto } from "@/types/MachineInfo";
import { Customer } from "@/types/Customer";

function CreateTickets() {
  useAuthenticated();
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [mustBeDoing, setMustBeDoing] = useState("");
  const [haveTried, setHaveTried] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


 const [customers, setCustomers] = useState<Customer[]>([]);
 const [machines, setMachines] = useState<MachineInfoDto[]>([]);
  const [preview, setPreview] = useState<(string | ArrayBuffer)[]>([]);
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [CustomerID, setCustomerID] = useState("");
  const [accountID, setAccountID] = useState("");
  const [value, setValue] = useState("");
  const [isClient, setIsClient] = useState<boolean>(false);
  const customerSelectedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPhone();
    checkAccount();
    getCustomers();
    getMachines();
    GetCustomer();
  }, []);

  useEffect(() => {
    GetCustomer();
    if (!customerSelectedRef.current) {
      customerSelectedRef.current = true;
    }
  }, [accountID]);


  const handleCheckbox = () => {
    setChecked(!isChecked);
    isChecked ? getPhone() : null;
  };

  const checkAccount = () => {
    const accountClass = localStorage.getItem("Class");
    setIsClient(accountClass == "Client");
    if (isClient) {
      setCustomerID(localStorage.getItem("Id")!);
    }
  };

  const { t, } = useTranslation();

  const handleRemove = (indexToRemove: number) => {
    const updatedPreview = [...preview];
    updatedPreview.splice(indexToRemove, 1);
    setPreview(updatedPreview);
  };

  async function GetCustomer() {
    if (accountID) {
      let Customer = await fetch(
        API_BASE_URL + "/api/Customers/getCustomer?AccountId=" + accountID,
        getBaseQueryRequest(),
      ).then((data) => data.json());
      setCustomerID(Customer.customerId);
    }
  }

  async function getCustomers() {
    let customerlist = await fetch(
      API_BASE_URL +
      "/api/Customers",
      getBaseQueryRequest(),
    ).then((data) => data.json());
    console.log(customerlist);
    setCustomers(customerlist);
  }

  async function getMachines() {
    if (CustomerID) {
      let machinelist = await fetch(
        API_BASE_URL +
        "/GetMachinesPerAccount?accountId=" +
        CustomerID,
        getBaseQueryRequest(),
      ).then((data) => data.json());
      setMachines(machinelist);
    }
  }

  async function getPhone() {
    let currentaccount = await fetch(
      API_BASE_URL + "/api/accounts/",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((accounts) =>
        accounts.find(
          (acc: any) => acc.accountId == localStorage.getItem("Id"),
        ),
      );

    setPhoneNumber(currentaccount.phoneNumber);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (fileList) {
      const allPreviews: (string | ArrayBuffer)[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (result) {
            allPreviews.push(result);
            if (preview.length != null) {
              preview.forEach(function (item) {
                allPreviews.push(item);
              });
            }
            setPreview(allPreviews);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async function handleSubmit() {
    setIsLoading(true);
    if (
      problem.length != 0 &&
      mustBeDoing.length != 0 &&
      haveTried.length != 0 &&
      title.length != 0
    ) {
      let machine = machines.find(
       (machine: MachineInfoDto) => machine.name.toLowerCase() == value,
      );
      if (machine == undefined) {
        toast({
          variant: "destructive",
          title: t("ticket.error"),
          description: t("ticket.machinealert"),
        });
        setIsLoading(false);
      } else if (
        problem.split(" ").length < 20 ||
        mustBeDoing.split(" ").length < 20
      ) {
        toast({
          variant: "destructive",
          title: t("ticket.error"),
          description: t("ticket.wordsalert"),
        });
        setIsLoading(false);
      } else if (phoneNumber == "" || phoneNumber == null) {
        toast({
          variant: "destructive",
          title: t("ticket.error"),
          description: t("ticket.phonealert"),
        });
        setIsLoading(false);
      } else {
        var currentTicket = {
          Machine_Id: machine?.machineId,
          Customer_Id: CustomerID,
          Title: title,
          Priority: "Not Set",
          Status: "Open",
          Date_Created: new Date()
            .toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .replace(",", "")
            .replace("/", "-")
            .replace("/", "-"),
          Problem: problem,
          MustBeDoing: mustBeDoing,
          HaveTried: haveTried,

          files: preview,
          phoneNumber: phoneNumber,
        };

        await fetch(
          API_BASE_URL + "/api/tickets/",
          postBaseMutateRequest(JSON.stringify(currentTicket)),
        );
        toast({
          variant: "default",
          title: t("successtitle"),
          description: t("ticket.submitalert"),
        });
        setIsLoading(false);
        navigate("/tickets");

      }
    } else {
      toast({
        variant: "destructive",
        title: t("ticket.error"),
        description: t("ticket.emptyalert"),
      });
      setIsLoading(false);
    }
  }

  async function handleCancel() {
    navigate(-1);
  }

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col">
        <div className="grid gap-8">
          <div className="">
            <h1 className="text-3xl font-medium">{t("ticket.header")}</h1>
            <Label>{t("ticket.details")}</Label>
          </div>
          <div className="grid gap-2">
            {!isClient ? (
              <>
                <Label>Select CustomerID</Label>
                <div className="w-1/6">
                  <Popover open={open1} onOpenChange={setOpen1}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open1}
                        className="w-[200px] justify-between"
                      >
                        {accountID
                          ? customers.find(
                            (account: Customer) => account.accountId.toString() == accountID,
                          )?.customerId
                          : t("selectcustomer")}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search customer..." />
                        <CommandEmpty>No customer found.</CommandEmpty>
                        <CommandGroup>
                          {customers.map((customer) => (
                            <CommandItem
                              key={customer.accountId.toString()}
                              value={customer.accountId.toString()}
                              onSelect={(currentValue) => {
                                setAccountID(currentValue);
                                setOpen1(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  accountID === customer.accountId.toString()
                                    ? "opacity-100"
                                    : "opacity-0"
                                )} />
                              {customer.customerId}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {CustomerID && machines ? (
                  <><Label>{t("ticket.selectmachinedes")}</Label><div className="w-1/6">
                    <Popover open={open2} onOpenChange={setOpen2}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open2}
                          className="w-[200px] justify-between"
                          onClick={getMachines}
                        >
                          {value
                            ? machines.find(
                              (machine: any) => machine.name.toLowerCase() == value
                            )?.name
                            : t("selectmachine")}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search machine..." />
                          <CommandEmpty>No machine found.</CommandEmpty>
                          <CommandGroup>
                            {machines.map((machine) => (
                              <CommandItem
                                key={machine.name + machine.machineId}
                                value={machine.name}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen2(false);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === machine.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )} />
                                {machine.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div></>

                ) : null}</>
            ) :
              <><Label>{t("ticket.selectmachinedes")}</Label><div className="w-1/6">
                <Popover open={open2} onOpenChange={setOpen2}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open2}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? machines.find(
                          (machine: any) => machine.name.toLowerCase() == value
                        )?.name
                        : t("selectmachine")}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search machine..." />
                      <CommandEmpty>No machine found.</CommandEmpty>
                      <CommandGroup>
                        {machines.map((machine) => (
                          <CommandItem
                            key={machine.name}
                            value={machine.name}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen2(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === machine.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )} />
                            {machine.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div></>
            }
          </div>
          <div className="grid gap-2">
            <Label>{t("ticket.title")}</Label>
            <Textarea
              className="custom-scrollbar"
              required
              placeholder={t("ticket.titledes")}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <TextareaHint>
              Enter the title for the ticket (visible in the tickets table)...
            </TextareaHint>
          </div>

          <div className="grid gap-2">
            <Label>{t("ticket.problem")}</Label>
            <Textarea
              className="custom-scrollbar"
              required
              placeholder={t("ticket.place1")}
              onChange={(e) => setProblem(e.currentTarget.value)}
            />
            <TextareaHint>{t("ticket.problemdes")}</TextareaHint>
          </div>

          <div className="grid gap-2">
            <Label>{t("ticket.bedoing")}</Label>
            <Textarea
              className="custom-scrollbar"
              placeholder={t("ticket.place2")}
              onChange={(e) => setMustBeDoing(e.currentTarget.value)}
            />
            <TextareaHint>{t("ticket.bedoingdes")}</TextareaHint>
          </div>

          <div className="grid gap-2">
            <Label>{t("ticket.havetried")}</Label>
            <Textarea
              className="custom-scrollbar"
              placeholder={t("ticket.place3")}
              onChange={(e) => setHaveTried(e.currentTarget.value)}
            />
            <TextareaHint>{t("ticket.havetrieddes")}</TextareaHint>
          </div>

          <div>

            {Boolean(phoneNumber) ? (
              <div className="mx-auto flex flex-col items-start space-y-2">

              <div className="w-full flex items-center">
              <Label>{t("ticket.currentphonenum")}</Label>
              <Label className="m-1">{phoneNumber}</Label>
              </div>
              <div className="w-full flex items-center">
                <Checkbox id="" onClick={handleCheckbox} className=""/>
                <label
                  htmlFor="terms"
                  className="p-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("ticket.phonenum")}
                </label>
              </div>
            </div>
            ) : 
              <>
                <div>
                  <Label>{t("ticket.phonenumwithstar")}</Label>
                </div>
                <div className="pt-2">
                  <Input
                    placeholder={t("ticket.place4")}
                    onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                  />
                </div>
              </>
            }
            {isChecked ? (
              <>
                <div className="pt-2">
                  <Input
                    placeholder={t("ticket.place4")}
                    onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                  />
                </div>
              </>
            ) : null}
          </div>
          <div className="grid gap-2">
            <div className="">
              <Label>{t("ticket.files")}</Label>
              <Input
                className="w-2/6"
                name="image"
                multiple={true}
                onChange={handleFileUpload}
                accept="image/png, image/jpeg"
                id="picture"
                type="file"
              />
            </div>
            <div className="flex max-w-screen flex-wrap">
              {preview.map((previewItem, index) => (
                <div key={index} className="m-4 flex items-center">
                  <img
                    src={previewItem as string}
                    alt={`Preview ${index}`}
                    style={{ maxWidth: "500px", maxHeight: "400px" }}
                  />
                  <Button
                    variant={"destructive"}
                    onClick={() => handleRemove(index)}
                    className="ml-2"
                  >
                    {t("ticket.remove")}
                  </Button>{" "}
                  {/* Button to remove uploaded picture */}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Button
              className="w-1/6"
              variant="default"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {t("ticket.submit")}
            </Button>
            <Button
              className="w-1/6"
              variant={"destructive"}
              onClick={handleCancel}
            >
              {t("ticket.cancel")}
            </Button>
          </div>
          <Toaster />
        </div>
      </div>
    </Layout>
  );
}

export default CreateTickets;
