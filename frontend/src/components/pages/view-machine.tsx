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
import { Machine } from "@/types/Machine";
  
  function ViewMachine() {
    const machineID = localStorage.getItem("currentmachineID");
    const [currentMachine, setCurrentMachine] = useState<Machine | undefined>(
        undefined,
      );
    const [showMachineInfo, setShowMachineInfo] = useState(false);
    const [machineInfo, setMachineInfo] = useState<any>(null);

      useEffect(() => {
        getMachine();
      }, []);

      useEffect(() => {
        showMachine();
      }, []);

      async function getMachine() {
        let machine = await fetch(
          API_BASE_URL + "/api/tickets/" + machineID,
          getBaseQueryRequest(),
        ).then((data) => data.json());
        setCurrentMachine(machine);
        // return currentTicket;
      }

      async function showMachine() {
        if (currentMachine) {
          setShowMachineInfo(true);
          setMachineInfo(currentMachine);
        }
      }



    return (
        <Layout>
        <div className="mt-16 flex w-full max-w-screen flex-col">
            <label>View machine</label>
        </div>
        {showMachineInfo && (
        <div><Card>
                    <CardHeader>
                        <CardTitle>Name: {machineInfo.name}</CardTitle>
                        {"ID: " + machineInfo.machine_Id}
                    </CardHeader>

                    <CardContent>
                        
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card><CardDescription>Machine information</CardDescription>
                </div>
              )}
              
            </Layout>
    );

    
}
export default ViewMachine;