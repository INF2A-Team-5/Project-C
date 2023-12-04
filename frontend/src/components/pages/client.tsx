import Tablea from "../foundations/table";
import Settings from "../foundations/settings";
import { Button } from "../ui/button";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
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
  useAuthenticated();
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
            Restarting the machine?<br />
            Checking if the sensors are blocked?<br />
            Checking for any stuck items?<br />
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
      <Toaster />
    </div>
  );
}

export default Client;
