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
import { Toaster } from "../ui/toaster";
import { toast } from "../ui/use-toast";
import Layout from "../layout";
import { Machine } from "@/types/machine";
import { solutionColumns } from "@/services/Columns";
import Table from "../foundations/table";
import TableSkeleton from "../foundations/table-skeleton";
import { Solution } from "@/types/solution";
import { Account } from "@/types/account";

function ViewAccount() {
    const accountID = localStorage.getItem("currentaccountID");
    const [currentAccount, setCurrentAccount] = useState<Account | undefined>(
        undefined,
    );

    useEffect(() => {
        getAccount();
    }, []);

    async function getAccount() {
        let account = await fetch(
            API_BASE_URL + "/api/accounts/" + accountID,
            getBaseQueryRequest(),
        ).then((data) => data.json());
        console.log(account)
        setCurrentAccount(account);
        // return currentTicket;
    }

    return (
        <Layout>
            <div className="mt-16 flex w-full max-w-screen flex-col">
                <div className="grid gap-8">

                    {currentAccount && (
                        <div>
                            <div className="px-4 px-0">
                                <h1 className="text-3xl font-medium">ID: {currentAccount.accountId}</h1>
                                {/* <p className="mt-1 max-w-2xl text-lg leading-6 text-foreground">Account information</p> */}
                                <p className="mt-1 max-w-2xl text-lg leading-6 text-foreground">Class: {currentAccount.class}</p>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 grid grid-cols-2 gap-2 px-0">
                                        <p className="text-xl font-medium leading-6 text-foreground">Name</p>
                                        <p className="mt-1 text-lg leading-6 text-foreground col-span-2 mt-0">{currentAccount.name}</p>
                                    </div>
                                    <div className="px-4 py-6 grid grid-cols-2 gap-2 px-0">
                                        <p className="text-xl font-medium leading-6 text-foreground">Password</p>
                                        <p className="mt-1 text-lg leading-6 text-foreground col-span-2 mt-0">{currentAccount.password}</p>
                                    </div>
                                    <div className="px-4 py-6 grid grid-cols-2 gap-2 px-0">
                                        <p className="text-xl font-medium leading-6 text-foreground">Phone number</p>
                                        {currentAccount.phoneNumber ? (
                                            <p className="mt-1 text-lg leading-6 text-foreground col-span-2 mt-0">{currentAccount.phoneNumber}</p>
                                        ) : (
                                            <p className="mt-1 text-lg leading-6 text-foreground col-span-2 mt-0">There is no phone number connected to this account</p>
                                        )}

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
export default ViewAccount