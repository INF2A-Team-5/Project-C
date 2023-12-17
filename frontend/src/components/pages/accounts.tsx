import Table from "../foundations/table";
import {
  useQuery,
} from "@/lib/api";
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
import { Icons } from "../foundations/icons";
import { Account } from "@/types/Account";

import { TextareaHint } from "../ui/textarea";
import Layout from "../layout";
import AddAccount from "../foundations/add-account";

function Accounts() {
  const { data, isFetching } = useQuery<Account[]>("/api/accounts", {
    onError: () => {
      toast({
        variant: "destructive",
        title: "Whomp whomp:(",
        description: "U get no data",
      });
    },
  });

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Accounts</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" disabled={isFetching}>
                Add account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Account</DialogTitle>
                <TextareaHint>Create accounts for new clients</TextareaHint>
              </DialogHeader>
              <DialogDescription className="grid gap-2">
              <AddAccount/>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={accountColumns} />
          ) : (
            <div className="flex h-[20rem] w-full items-center justify-center">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            </div>
          )}
          <div className="h-44"></div>
        </div>
      </div>
    </Layout>
  );
}

export default Accounts;
