import { useState } from "react";
import Table from "../foundations/table";
import { Toaster } from "../ui/toaster";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
  useQuery,
} from "@/lib/api";
import { accountColumns } from "@/services/Columns";
import Navbar from "../foundations/navbar";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";
import { Account } from "@/services/Account";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TextareaHint } from "../ui/textarea";
import Layout from "../layout";

function Departments() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  // const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [userType, setUserType] = useState("Client");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, isFetching } = useQuery<Account[]>("/api/accounts", {
    onError: () => {
      toast({
        variant: "destructive",
        title: "Whomp whomp:(",
        description: "U get no data",
      });
    },
  });
  // const [loadData, setData] = useState<Boolean>(false);
  // if (loadData == false) {
  //   getData();
  //   setData(true);
  // }

  // async function getData() {
  //   setAllAccounts(
  //     await fetch(API_BASE_URL + "/api/Accounts", getBaseQueryRequest()).then(
  //       (data) => data.json(),
  //     ),
  //   );
  // }

  async function handleSubmit() {
    setIsLoading(true);
    const account = await fetch(
      API_BASE_URL + "/api/accounts",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((accounts) => accounts.find((acc: any) => acc.name == username));

    if (account !== undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Username already exists.",
      });
      setIsLoading(false);
    } else if (username == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a username.",
      });
      setIsLoading(false);
    } else if (password == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a password.",
      });
      setIsLoading(false);
    } else if (password != confirmpassword) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Password and confirmed password need to match.",
      });
      setIsLoading(false);
    } else {
      fetch(
        API_BASE_URL + "/api/accounts",
        postBaseMutateRequest(
          JSON.stringify({
            name: username,
            password: password,
            class: userType,
          }),
        ),
      ).then((response) => response.json());

      toast({
        variant: "default",
        title: "Succes!",
        description: "Account added successfully.",
      });
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Accounts</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Add account</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Account</DialogTitle>
                <TextareaHint>Create accounts for new clients</TextareaHint>
              </DialogHeader>
              <DialogDescription className="grid gap-2">
                <Input
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <Input
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  onChange={(e) => setconfirmPassword(e.currentTarget.value)}
                />
                <Select
                  value={userType}
                  onValueChange={(value) => setUserType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a User Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Client">Client</SelectItem>
                    <SelectItem value="ServiceEmployee">
                      Service Employee
                    </SelectItem>
                  </SelectContent>
                </Select>
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button
                  className="w-fit"
                  variant="default"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Add account
                </Button>
              </DialogFooter>
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

export default Departments;
