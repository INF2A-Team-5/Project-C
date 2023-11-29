import React from "react";
import Table from "../foundations/table";
import Settings from "../foundations/settings";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

function Client() {
  function toTicket() {
    window.location.href = window.location.href.replace("client", "tickets");
  }
  return (
    <div>
      <h1 className="text-4xl font-medium p-10">Client</h1>
      <Settings></Settings>
      <Table></Table>
      <Dialog.Root>
        <Dialog.Trigger className="h-12 w-80 px-8 rounded-md font-medium text-base text-white bg-primary-400 hover:bg-primary-600 dark:text-dark-500 dark:bg-primary-500 dark:hover:bg-primary-700">
          Create Ticket
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0  opacity-40 " />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-dark-400 bg-white
                                  border-2 border-[var(--border)] text-dark-400 dark:text-white rounded-md py-8 pl-16 w-2/5 shadow-sm"
          >
            <Dialog.Title className="text-3xl font-medium dark:bg-dark-400 bg-white">
              Before you make a ticket, have you tried
            </Dialog.Title>
            <br />
            <p className="text-lg text-dark-500 bg-white dark:text-white dark:bg-dark-400">
              Restarting the machine?
            </p>
            <p className="text-lg text-dark-500 bg-white dark:text-white dark:bg-dark-400">
              Checking if the sensors are blocked?
            </p>
            <p className="text-lg text-dark-500 bg-white dark:text-white dark:bg-dark-400">
              Checking for any stuck items?
            </p>
            <Dialog.Close className="fixed top-10 right-10 hover:text-grey-800">
              <Cross1Icon />
            </Dialog.Close>
            <div className="flex justify-end pt-4 pr-10 bg-white dark:bg-dark-400">
              <Dialog.Close className="pr-6">
                <Button >
                  No I haven't
                </Button>
              </Dialog.Close>
              <div>
                <Button  onClick={toTicket}>
                  Yes I have
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default Client;
