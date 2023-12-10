import Header from "../foundations/header";
import React, { useEffect } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// import UploadService from "../../services/FileUploadService";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Settings from "../foundations/settings";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";
import { Textarea, TextareaHint } from "../ui/textarea";
import { Label } from "../ui/label";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Icons } from "../foundations/icons";
import {
  API_BASE_URL,
  getBaseMutateRequest,
  getBaseQueryRequest,
} from "@/lib/api";
import { useTranslation } from "react-i18next";
import { Value } from "@radix-ui/react-select";

// import axios from 'axios';
// export interface Machine {
//   MachineId: number; Name: string; Description: string; AccountId: number
// }

// export interface Account {
//   AccountId: number; Name: string; Password: string; Class: number
// }

function Tickets() {
  useAuthenticated();
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [mustbedoing, setMustBeDoing] = useState("");
  const [havetried, setHaveTried] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const navigate = useNavigate();
  const [machinenames, SetMachineNames] = useState<string[]>([]);
  const [account, SetAccount] = useState("");
  const [preview, setPreview] = useState<(string | ArrayBuffer)[]>([]);
  const [isChecked, setChecked] = useState<boolean>(false);
  const [selectMachine, setSelectMachine] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckbox = () => {
    setChecked(!isChecked);
  };

  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);

  const handleRemove = (indexToRemove: number) => {
    const updatedPreview = [...preview];
    updatedPreview.splice(indexToRemove, 1);
    setPreview(updatedPreview);
    console.log(preview);
  };

  class Machine {
    name: string;
    machineId: number;
    constructor(name: string, machineId: number) {
      this.name = name;
      this.machineId = machineId;
    }
  }

  if (machinenames.length == 0) {
    getData();
  }

  async function getData() {
    let machinelist = await fetch(
      API_BASE_URL + "/api/machines" + getBaseQueryRequest,
    ).then((data) => data.json());

    // let machinelist = await fetch(
    //   "http://localhost:5119/GetMachinesPerAccount?accountId=" +
    //     localStorage.getItem("Id"),
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: "bearer " + localStorage.getItem("Token"),
    //     },
    //   }
    // ).then((data) => data.json());

    SetAccount(localStorage.getItem("Id")!);
    SetMachineNames(
      machinelist.map(
        (machine: Machine) => machine.name + ", Id: " + machine.machineId,
      ),
    );
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    // const target = e.target as HTMLInputElement & {
    //   files: FileList;
    // }
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
            // console.log(allPreviews);
            // You may want to set a state or perform other actions with 'result' here

            if (preview.length != null) {
              preview.forEach(function (item) {
                allPreviews.push(item);
              });
            }
            setPreview(allPreviews);
            console.log(preview);
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
      mustbedoing.length != 0 &&
      havetried.length != 0 &&
      title.length != 0
    ) {
      if (selectMachine == "") {
        toast({
          variant: "destructive",
          title: t("ticket.error"),
          description: t("ticket.machinealert"),
        });
        setIsLoading(false);
        // navigate("/tickets");
      } else if (
        problem.split(" ").length < 20 ||
        mustbedoing.split(" ").length < 20
      ) {
        toast({
          variant: "destructive",
          title: t("ticket.error"),
          description: t("ticket.wordsalert"),
        });
        setIsLoading(false);
        // navigate("/tickets");
      } else if (phonenumber == "" || phonenumber == null) {
        toast({
          variant: "destructive",
          title: t("ticket.error"),
          description: t("ticket.phonealert"),
        });
        // navigate("/tickets");
        setIsLoading(false);
      } else {
        var currentticket = {
          Machine_Id: selectMachine.split("Id: ")[1],
          Customer_Id: account,
          Title: title,
          Priority: "unknown",
          Status: "Open",
          Date_Created: new Date(),

          Problem: problem,
          MustBeDoing: mustbedoing,
          HaveTried: havetried,

          files: preview,
          phoneNumber: phonenumber,
        };

        await fetch(API_BASE_URL + "/api/tickets/" + getBaseMutateRequest, {
          body: JSON.stringify(currentticket),
        })
          .then((res) => {
            console.log("Message successfully updated", res);
          })
          .catch((err) => {
            console.log("Message could not be updated", err);
          });

        // await fetch("http://localhost:5119/api/tickets/", {
        //   method: "POST",
        //   headers: {
        //     Authorization: "bearer " + localStorage.getItem("Token"),
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(currentticket),
        // })
        // .then((res) => {
        //   console.log("Message successfully updated", res);
        // })
        // .catch((err) => {
        //   console.log("Message could not be updated", err);
        // });

        toast({
          variant: "default",
          title: "Succes!",
          description: t("ticket.submitalert"),
        });
        setIsLoading(false);
        navigate("/client");

        // reader.readAsDataURL(file);
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

  async function HandleCancel() {
    navigate("/client");
  }

  return (
    <div className="px-24 text-left">
      <Settings></Settings>
      <div className="flex justify-center pb-16 pt-10">
        <Header></Header>
      </div>
      <div className="grid gap-12">
        <div className="">
          <h1 className="text-4xl font-medium">{t("ticket.header")}</h1>
          <Label>{t("ticket.details")}</Label>
        </div>
        <div className="grid gap-2">
          <Label>{t("ticket.selectmachinedes")}</Label>
          <div className="w-1/6">
            <Select
              value={selectMachine}
              onValueChange={(value) => setSelectMachine(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("ticket.selectmachine")} />
              </SelectTrigger>
              <SelectContent>
                {machinenames.map((type) => (
                  <SelectItem key={type} value={type.toString()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>{t("ticket.title")}</Label>
          <Textarea
            className="custom-scrollbar"
            required
            placeholder={t("ticket.titledes")}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
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
          <div className="mx-auto flex items-center space-x-2">
            <Checkbox id="" onClick={handleCheckbox} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("ticket.phonenum")}
            </label>
          </div>
          {isChecked ? (
            <>
              <div className="pt-2">
                <Input
                  placeholder={t("ticket.place4")}
                  onChange={(e) => setPhonenumber(e.currentTarget.value)}
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
          <div className="flex flex-wrap max-w-screen">
            {preview.map((previewItem, index) => (
              <div key={index} className="flex items-center m-4">
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
          <Button className="w-1/6" onClick={handleSubmit}>
            {t("ticket.submit")}
          </Button>
          <Button
            className="w-1/6"
            variant={"destructive"}
            onClick={HandleCancel}
          >
            {t("ticket.cancel")}
          </Button>
        </div>
        <Button
          className="w-1/6"
          variant="default"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Submit
        </Button>
        <Toaster />
      </div>
    </div>
  );
}

export default Tickets;
