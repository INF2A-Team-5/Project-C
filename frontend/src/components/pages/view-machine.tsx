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
    showMachine();
  }, []);

  // useEffect(() => {
  //   showMachine();
  // }, []);

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
      <div className="mt-16 flex w-full max-w-screen flex-col">
        <div className="grid gap-8">

          {showMachineInfo && (
            <div>
              <div className="px-4 sm:px-0">
                <h1 className="text-3xl font-medium">{machineInfo.name}</h1>
                <p className="mt-1 max-w-2xl text-lg leading-6 text-foreground">Machine information</p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0">
                    <p className="text-xl font-medium leading-6 text-foreground">Description</p>
                    <p className="mt-1 text-lg leading-6 text-foreground sm:col-span-2 sm:mt-0">{machineInfo.description}</p>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0">
                    <p className="text-xl font-medium leading-6 text-foreground">Customer</p>
                    <p className="mt-1 text-lg leading-6 text-foreground sm:col-span-2 sm:mt-0">{machineInfo.customer_Id}</p>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0">
                    <p className="text-xl font-medium leading-6 text-foreground">Email address</p>
                    <p className="mt-1 text-lg leading-6 text-foreground sm:col-span-2 sm:mt-0">margotfoster@example.com</p>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0">
                    <p className="text-xl font-medium leading-6 text-gray-900">Tickets</p>
                    <p className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</p>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );


}
export default ViewMachine;