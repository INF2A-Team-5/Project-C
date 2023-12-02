import React from "react";
import Tablea from "../foundations/table";
import Settings from "../foundations/settings";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function Client() {
  
  // useAuthenticated()
  return (
    <div>
      <h1 className="text-4xl font-medium p-10">Client</h1>
      <Settings></Settings>
      <Tablea></Tablea>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Ticket</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Before you make a ticket, have you tried?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p>Restarting the machine.</p>
            <p>Checking if the sensors are blocked.</p>
            <p>Checking for any stuck items.</p>
          </DialogDescription>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">No I haven't</Button>
            </DialogClose>
            <Link to="/tickets">
              <Button>Yes I have</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Client;
