import Header from "../foundations/header";
import React from "react";
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

// export interface Account {
//   AccountId: number; Name: string; Password: string; Class: number
// }

function Tickets() {
  useAuthenticated();
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

  const handleCheckbox = () => {
    setChecked(!isChecked);
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
      "http://localhost:5119/GetMachinesPerAccount?accountId=" +
        localStorage.getItem("Id"),
      {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
        },
      }
    ).then((data) => data.json());
    SetAccount(localStorage.getItem("Id")!);
    SetMachineNames(
      machinelist.map(
        (machine: Machine) => machine.name + ", Id: " + machine.machineId
      )
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
            setPreview(allPreviews);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async function handleSubmit() {
    if (
      problem.length != 0 &&
      mustbedoing.length != 0 &&
      havetried.length != 0
    ) {
      if (selectMachine == "") {
        toast({
          variant: "destructive",
          title: "Error! Something went wrong.",
          description: "Please select the broken machine.",
        });
        navigate("/tickets");
      } else if (
        problem.split(" ").length < 20 ||
        mustbedoing.split(" ").length < 20
      ) {
        toast({
          variant: "destructive",
          title: "Error! Something went wrong.",
          description:
            "The initial two inputs have a minimum of 20 words each for comprehensive elaboration.",
        });
        navigate("/tickets");
      } else if (phonenumber == "" || phonenumber == null) {
        toast({
          variant: "destructive",
          title: "Error! Something went wrong.",
          description: "Please enter a phone number for contact purposes.",
        });
        navigate("/tickets");
      } else {
        var currentticket = {
          Machine_Id: selectMachine.split("Id: ")[1],
          Customer_Id: account,
          Priority: "unknown",
          Status: "Open",
          Date_Created: new Date(),

          Problem: problem,
          MustBeDoing: mustbedoing,
          HaveTried: havetried,

          files: preview,
          phoneNumber: phonenumber,
        };

        await fetch("http://localhost:5119/api/tickets/", {
          method: "POST",
          headers: {
            Authorization: "bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentticket),
        })
          .then((res) => {
            console.log("Message successfully updated", res);
          })
          .catch((err) => {
            console.log("Message could not be updated", err);
          });
        toast({
          variant: "default",
          title: "Succes!",
          description: "Your ticket has been submitted.",
        });

        navigate("/client");

        // reader.readAsDataURL(file);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error! Something went wrong.",
        description: "Fill in all necessary fields to submit a ticket.",
      });
    }
  }

  return (
    <div className="text-left px-24">
      <Settings></Settings>
      <div className="flex justify-center pb-16 pt-10">
        <Header></Header>
      </div>
      <div className="grid gap-12">
        <div className="">
          <h1 className="text-4xl font-medium">Report error</h1>
          <Label>
            Give details of the error and we will try to help you as soon as
            possible
          </Label>
        </div>
        <div className="grid gap-2">
          <Label>Select the machine related to the ticket</Label>
          <div className="w-1/6">
            <Select
              value={selectMachine}
              onValueChange={(value) => setSelectMachine(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a machine" />
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
          <Label>What do you see?*</Label>
          <Textarea
            className="custom-scrollbar"
            required
            placeholder="shit broken"
            onChange={(e) => setProblem(e.currentTarget.value)}
          />
          <TextareaHint>
            Give us a detailed description on any visible defects (Atleast 20
            words)
          </TextareaHint>
        </div>

        <div className="grid gap-2">
          <Label>What should it do?*</Label>
          <Textarea
            className="custom-scrollbar"
            placeholder="work"
            onChange={(e) => setMustBeDoing(e.currentTarget.value)}
          />
          <TextareaHint>
            Give us a detailed description on what the machine should do
            (Atleast 20 words)
          </TextareaHint>
        </div>

        <div className="grid gap-2">
          <Label>What have you tried?*</Label>
          <Textarea
            className="custom-scrollbar"
            placeholder="hit with hammer"
            onChange={(e) => setHaveTried(e.currentTarget.value)}
          />
          <TextareaHint>
            Describe all things you have done to try fixing the machine
          </TextareaHint>
        </div>

        <div>
          <div className="mx-auto flex items-center space-x-2">
            <Checkbox id="" onClick={handleCheckbox} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use other phone Number
            </label>
          </div>
          {isChecked ? (
            <>
              <div className="pt-2">
                <Input
                  placeholder="Enter phone number"
                  onChange={(e) => setPhonenumber(e.currentTarget.value)}
                />
              </div>
            </>
          ) : null}
        </div>
        <div className="grid gap-2">
          <div className="">
            <Label>Upload videos/pictures</Label>
            <Input
              className="w-2/6"
              name="image"
              multiple={true}
              onChange={handleFileUpload}
              accept="image/png, image/jpg"
              id="picture"
              type="file"
            />
          </div>
          {preview.map((previewItem, index) => (
            <img
              key={index}
              src={previewItem as string}
              alt={`Preview ${index}`}
            />
          ))}
        </div>
        <Button className="w-1/6" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <Toaster />
      <div className="h-12"></div>
    </div>
  );
}

export default Tickets;
