import Table from "../foundations/table";
import { useQuery } from "@/lib/api";
import { accountColumns } from "@/services/Columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { Account } from "@/types/Account";
import { TextareaHint } from "../ui/textarea";
import Layout from "../layout";
import AddAccount from "../foundations/add-account";
import TableSkeleton from "../foundations/table-skeleton";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Accounts() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const { data, isFetching } = useQuery<Account[]>(
    `/api/accounts/archived/${false}`,
    {
      onError: () => {
        toast({
          variant: "destructive",
          title: t("toast.errortitle"),
          description: t("toast.no_data_error"),
        });
      },
    },
  );

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">{t("account.h1")}</h1>
          <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" disabled={isFetching}>
                {t("account.add")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("account.add")}</DialogTitle>
                <TextareaHint>{t("account.create")}</TextareaHint>
              </DialogHeader>
              <DialogDescription className="grid gap-2">
                <AddAccount setOpen={setOpen} />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={accountColumns(t)} />
          ) : (
            <TableSkeleton />
          )}
          <div className="h-44"></div>
        </div>
      </div>
    </Layout>
  );
}

export default Accounts;
