import Table from "../foundations/table";
import { Toaster } from "../ui/toaster";
import { useQuery } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { modelColums } from "@/services/Columns";
import { TextareaHint } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import Layout from "../layout";
import AddMachine from "../foundations/add-machine";
import TableSkeleton from "../foundations/table-skeleton";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Machines() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const isClient = localStorage.getItem("Class") == "Client";
  const apiUrl = isClient
    ? `/GetMachinesByArchived?archived=false&AccountId=${localStorage.getItem("Id")}`
    : `/api/MachineModels?accountId=${localStorage.getItem("Id")}&archived=false`;
  const { data, isFetching } = useQuery<any[]>(apiUrl, {
    onError: () => {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.no_data_error"),
      });
    },
  });
  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">{t("machine.h1")}</h1>
          {localStorage.getItem("Class") == "Admin" ? (
            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" disabled={isFetching}>
                {t("machine.add")}
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("machine.add")}</DialogTitle>
                  <TextareaHint>{t("machine.create")}</TextareaHint>
                </DialogHeader>
                <DialogDescription>
                  <AddMachine setOpen={setOpen} />
                </DialogDescription>
              </DialogContent>
            </Dialog>
          ) : null}
        </div>
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={modelColums(t)} />
          ) : (
            <TableSkeleton />
          )}
          <div className="h-44"></div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}

export default Machines;
