import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Textarea, TextareaHint } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
  useQuery,
} from "@/lib/api";
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
import { Toaster } from "../ui/toaster";
import { toast } from "../ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Layout from "../layout";
import { Machine } from "@/types/machine";
import { solutionColumns } from "@/services/Columns";
import { Table } from "lucide-react";
import TableSkeleton from "../foundations/table-skeleton";
import { Solution } from "@/types/solution";

function ViewMachine() {
  const machineID = localStorage.getItem("currentmachineID");
  const [currentMachine, setCurrentMachine] = useState<Machine | undefined>(
    undefined,
  );
  const [showMachineInfo, setShowMachineInfo] = useState(false);
  const [machineInfo, setMachineInfo] = useState<any>(null);
  const { data } = useQuery<Solution[]>("/api/solutions");

  useEffect(() => {
    getMachine();
  }, []);

  useEffect(() => {
    showMachine();
  }, []);

  async function getMachine() {
    let machine = await fetch(
      API_BASE_URL + "/api/machines/" + machineID,
      getBaseQueryRequest(),
    ).then((data) => data.json());
    console.log(machine)
    setCurrentMachine(machine);
    // return currentTicket;
  }

  async function showMachine() {
    console.log(currentMachine)
    if (currentMachine) {
      setShowMachineInfo(true);
      setMachineInfo(currentMachine);
    }
  }

  return (
    <Layout>
      {/* <div className="mt-16 flex w-full max-w-screen flex-col">
        <div className="grid gap-8">
          <div>
            <h1 className="text-3xl font-medium">The machine</h1>
            <Label>View this machine</Label>
          </div>
          {showMachineInfo && (
            <div className="grid w-full items-center gap-4"><Card>
              <CardHeader>
                <CardTitle>Name: {machineInfo.name}</CardTitle>
                {"ID: " + machineInfo.machineId}
                <CardDescription>Machine information</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <p className="font-medium" >Machine description</p>
                  <p>{machineInfo.description}</p>
                  <p>{machineInfo.customer_Id}</p>
                  <p className="font-medium" >Department {machineInfo.departmentId}</p>

                </div>
              </CardContent>
              <CardFooter>

              </CardFooter>
            </Card>
            </div>
          )}
          <div className="grid gap-12">
            {data ? (
              <Table data={data} columns={solutionColumns} />
            ) : (
              <TableSkeleton />
            )}
            <div className="h-44"></div>
          </div>
        </div>
      </div> */}
      {showMachineInfo && (
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-foreground">{machineInfo.name}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Machine information</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{machineInfo.description}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Customer</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{machineInfo.customer_Id}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Tickets</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

    </Layout>
  );


}
export default ViewMachine;