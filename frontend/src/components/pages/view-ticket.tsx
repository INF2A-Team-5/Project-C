import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Link, useNavigate } from "react-router-dom";
import Settings from "../foundations/settings";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Textarea, TextareaHint } from "../ui/textarea";
import { Input } from "../ui/input";
import Header from "../foundations/header";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
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
import { use } from "i18next";
import { toast } from "../ui/use-toast";
import { Ticket } from "@/types/Ticket";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  BoxIcon,
  CardStackIcon,
  CardStackMinusIcon,
} from "@radix-ui/react-icons";
import { BookIcon, CalendarDays, CatIcon } from "lucide-react";
import { Icon } from "@radix-ui/react-select";
import Layout from "../layout";

function ViewTicket() {
  useAuthenticated();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);

  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [preview, setPreview] = useState<string[]>([]);
  const [ticketInfo, setTicketInfo] = useState<any>(null);
  const ticketid = localStorage.getItem("currentticketID");
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [solution, setSolution] = useState("");
  const [currentticket, setcurrenticket] = useState<Ticket | undefined>(
    undefined,
  );
  const [reopen, setReopen] = useState("");

  useEffect(() => {
    CheckAccount();
  }, []);

  useEffect(() => {
    GetTicket();
  }, []);

  useEffect(() => {
    ShowTicket();
  });

  async function HandleCancel() {
    navigate(-1);
  }

  const CheckAccount = () => {
    const accountclass = localStorage.getItem("Class");
    console.log(accountclass);
    setIsClient(accountclass == "Client");
  };

  const handleRemove = (indexToRemove: number) => {
    const updatedPreview = [...preview];
    updatedPreview.splice(indexToRemove, 1);
    setPreview(updatedPreview);
    console.log(preview);
  };

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (fileList) {
      const allPreviews: string[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        const reader = new FileReader();

        reader.onload = (event) => {
          const result = event.target?.result;

          if (result && typeof result === "string") {
            allPreviews.push(result); // Add strings (URLs or Base64-encoded) to previews
            setPreview([...allPreviews]); // Set the state after adding all previews
          }
        };

        reader.readAsDataURL(file);
      }
    }
  }

  async function SendTicket(ticket: Ticket) {
    if (ticket) {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/tickets/" + ticket.ticketId,
          putBaseMutateRequest(JSON.stringify(ticket)),
        );

        if (!response.ok) {
          const errorResponse = await response.text(); // Capture response content
          throw new Error(
            `HTTP error! Status: ${
              response.status
            }. Error message: ${JSON.stringify(errorResponse)}`,
          );
        }
        console.log("Ticket sended to database");
      } catch (error) {
        console.error("Error during PUT request:", error);
      }
    }
  }

  async function GetTicket() {
    let tick = await fetch(
      API_BASE_URL + "/api/tickets/" + ticketid,
      getBaseQueryRequest(),
    ).then((data) => data.json());
    setcurrenticket(tick);
    console.log(currentticket);
    // return currentticket;
  }

  async function ShowTicket() {
    if (currentticket) {
      setShowTicketInfo(true);
      setTicketInfo(currentticket);
    }
  }

  async function changePriority() {
    if (currentticket) {
      if (currentticket.priority == "Critical") {
        currentticket.priority = "Non critical";
      } else {
        currentticket.priority = "Critical";
      }
      SendTicket(currentticket);
      alert("Changed priority");
      navigate("/view-ticket");
    }
  }

  async function reopenTicket() {
    if (currentticket) {
      if (reopen.length != 0) {
        currentticket.notes = currentticket.notes
          ? [...currentticket.notes, reopen]
          : [reopen];
        currentticket.status = "Open";
        SendTicket(currentticket);
      } else {
        toast({
          variant: "destructive",
          title: "Error! Something went wrong.",
          description:
            "You need to enter a reason why you want to reopen the ticket",
        });
      }
    }
  }

  async function CloseTicket() {
    if (currentticket) {
      if (solution.length != 0) {
        currentticket.status = "Closed";
        currentticket.solution = solution;
        console.log(currentticket);
        SendTicket(currentticket);
      } else {
        toast({
          variant: "destructive",
          title: "Error! Something went wrong.",
          description:
            "You need to enter a solution if you want to close the ticket",
        });
      }
    }
  }

  async function HandleSubmit() {
    // const currentticket = await GetTicket();
    if (currentticket) {
      // currentticket.notes = currentticket.notes ? [...currentticket.notes, notes] : [notes];
      // currentticket.files = currentticket.files ? [...currentticket.files, ...preview] : [preview];
      currentticket.notes = currentticket.notes
        ? [...currentticket.notes, notes]
        : [notes];
      currentticket.files = currentticket.files
        ? [...currentticket.files, ...preview]
        : [...preview];
      // const ticket = {
      //   TicketId: currentticket.ticketId,
      //   Machine_Id: currentticket.machine_Id,
      //   Customer_Id: currentticket.customer_Id,
      //   Assigned_Id: currentticket.employee_Id,
      //   Title: currentticket.title,
      //   Priority: currentticket.priority,
      //   Status: currentticket.status,

      //   Problem: currentticket.problem,
      //   HaveTried: currentticket.haveTried,
      //   MustBeDoing: currentticket.mustBeDoing,
      //   Date_Created: currentticket.date_Created,

      //   Solution: currentticket.solution,
      //   PhoneNumber: currentticket.phoneNumber,
      //   Notes: currentticket.notes ? [...currentticket.notes, notes] : [notes],
      //   files: currentticket.files
      //     ? [...currentticket.files, ...preview]
      //     : [...preview],
      // }
      SendTicket(currentticket);
      alert("Ticket updated");
      navigate(-1);
      // If needed, you can handle the response data here
    }
  }

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col">
        <div className="grid gap-8">
          <div>
            <h1 className="text-3xl font-medium">Your ticket</h1>
            <Label>View and edit ticket</Label>
          </div>

          {showTicketInfo && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Title: {ticketInfo.title}</CardTitle>
                  {"ID: " + ticketInfo.ticketId}
                </CardHeader>

                <CardContent>
                  <h1>What is the problem?</h1>
                  <p className="XL">{ticketInfo.problem}</p>
                  <h1>What have you tried?</h1>
                  <p className="XL">{ticketInfo.haveTried}</p>
                  <h1>What should it be doing?</h1>
                  <p className="XL">{ticketInfo.mustBeDoing}</p>
                  <h1>Notes:</h1>
                  {ticketInfo.notes &&
                    ticketInfo.notes.map(
                      (
                        note:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | Iterable<ReactNode>
                          | null
                          | undefined,
                        index: Key | null | undefined,
                      ) => (
                        <p key={index} className="XL">
                          {note}
                        </p>
                      ),
                    )}
                </CardContent>
                <CardFooter>
                  <h1>
                    <b>Contact: </b>
                  </h1>
                  <p>{ticketInfo.phoneNumber}</p>
                </CardFooter>
              </Card>
              <CardDescription>Ticketinformation</CardDescription>
            </div>
          )}
          {/* Hij checkt hieronder eerst of de ticket open is, anders kan je namelijk niks meer toevoegen, dan krijg je wel de optie om hem te heropenen */}
          {currentticket?.status === "Open" ||
          currentticket?.status === "In Process" ? (
            <>
              <div className="grid gap-2">
                {/* <h2 className='text-lg font-medium'>{t('editticket.notes')}</h2> */}
                {!isClient && showTicketInfo ? (
                  <>
                    <h1>
                      <b>Priority at the moment:</b>
                    </h1>
                    {ticketInfo.priority}
                    <Button
                      className="w-fit"
                      variant="default"
                      onClick={changePriority}
                    >
                      Change priority
                    </Button>
                  </>
                ) : null}
                <Dialog>
                  <DialogTrigger asChild>
                    {isClient ? null : (
                      <Button className="w-fit" variant="destructive">
                        Close ticket
                      </Button>
                    )}
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Fill in solution</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <h2 className="text-lg font-medium">Add solution</h2>

                      {/* <Textarea placeholder={t('editticket.notes2')} onChange={(e: any) => setNotes(e.currentTarget.value)}></Textarea> */}
                      {/* <p className='text-md text-grey-900 '>{t('editticket.description')}</p> */}
                      <Textarea
                        placeholder="Fixed this and this"
                        onChange={(e: any) =>
                          setSolution(e.currentTarget.value)
                        }
                      ></Textarea>
                      <TextareaHint>
                        Give us a detailed description on what was the solution
                        of fixing the ticket
                      </TextareaHint>
                    </DialogDescription>
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          variant="ghost"
                          onClick={() => navigate(`/view-ticket`)}
                        >
                          Cancel
                        </Button>
                        <Button variant="secondary" onClick={CloseTicket}>
                          Submit
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Toaster />
                <h2 className="text-lg font-medium">Add notes</h2>

                {/* <Textarea placeholder={t('editticket.notes2')} onChange={(e: any) => setNotes(e.currentTarget.value)}></Textarea> */}
                {/* <p className='text-md text-grey-900 '>{t('editticket.description')}</p> */}
                <Textarea
                  placeholder="Still does not work because..."
                  onChange={(e: any) => setNotes(e.currentTarget.value)}
                ></Textarea>
                <TextareaHint>
                  Give us a detailed description on what you want to update the
                  ticket with
                </TextareaHint>
              </div>
              <div className="grid gap-2">
                <div className="">
                  <Label>{t("ticket.files")}</Label>
                  <Input
                    className="w-2/6"
                    name="image"
                    multiple={true}
                    onChange={handleFileUpload}
                    accept="image/png, image/jpeg"
                    id="picture"
                    type="file"
                  />
                </div>
                <div className="flex max-w-screen flex-wrap">
                  {preview.map((previewItem, index) => (
                    <div key={index} className="m-4 flex items-center">
                      <img
                        src={previewItem as string}
                        alt={`Preview ${index}`}
                        style={{ maxWidth: "500px", maxHeight: "400px" }}
                      />
                      <Button
                        variant={"destructive"}
                        onClick={() => handleRemove(index)}
                        className="ml-2"
                      >
                        {t("ticket.remove")}
                      </Button>{" "}
                      {/* Button to remove uploaded picture */}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Button variant="default" onClick={HandleSubmit}>
                  Submit
                </Button>
                <Button variant="destructive" onClick={HandleCancel}>
                  Go back
                </Button>
              </div>
            </>
          ) : (
            <div>
              <label>Ticket is closed</label>
              <br></br>
              <Dialog>
                <DialogTrigger asChild>
                  {isClient ? null : (
                    <Button className="w-fit" variant="default">
                      Reopen ticket
                    </Button>
                  )}
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reopen ticket</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <h2 className="text-lg font-medium">
                      Why do you want to reopen the ticket?
                    </h2>

                    {/* <Textarea placeholder={t('editticket.notes2')} onChange={(e: any) => setNotes(e.currentTarget.value)}></Textarea> */}
                    {/* <p className='text-md text-grey-900 '>{t('editticket.description')}</p> */}
                    <Textarea
                      placeholder="The error is not solved because..."
                      onChange={(e: any) => setReopen(e.currentTarget.value)}
                    ></Textarea>
                    <TextareaHint>
                      Give us a detailed description on why you want to reopen
                      your ticket
                    </TextareaHint>
                  </DialogDescription>
                  <DialogFooter>
                    <DialogClose>
                      <Button
                        variant="ghost"
                        onClick={() => navigate(`/view-ticket`)}
                      >
                        Cancel
                      </Button>
                      <Button variant="secondary" onClick={reopenTicket}>
                        Submit
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Toaster />
              <Button variant="destructive" onClick={HandleCancel}>
                Go back
              </Button>
            </div>
          )}

          {/* <Button variant='destructive'  onClick={HandleSubmit}>{t('editticket.submit')}</Button>
        <Button variant='destructive'  onClick={HandleCancel}>{t('editticket.cancel')}</Button> */}
        </div>
      </div>
    </Layout>
  );
}

export default ViewTicket;
