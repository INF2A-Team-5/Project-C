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
import { solutionColumns } from "@/services/Columns";
import { TextareaHint } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import Layout from "../layout";
import TableSkeleton from "../foundations/table-skeleton";
import { Solution } from "@/types/solution";
import AddTicketSolution from "../foundations/add-solution";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Solutions() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const { data, isFetching } = useQuery<Solution[]>("/api/Solutions", {
    onError: () => {
      toast({
        variant: "destructive",
        title: t("errortitle"),
        description: t("no_data_error"),
      });
    },
  });

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">{t("solution.h1")}</h1>
          {localStorage.getItem("Class") == "Admin" ? (
            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" disabled={isFetching}>
                  {t("solution.add")}
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("solution.add")}</DialogTitle>
                  <TextareaHint>{t("solution.create")}</TextareaHint>
                </DialogHeader>
                <DialogDescription>
                  <AddTicketSolution setOpen={setOpen} />
                </DialogDescription>
              </DialogContent>
            </Dialog>
          ) : null}
        </div>
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={solutionColumns(t)} />
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

export default Solutions;
