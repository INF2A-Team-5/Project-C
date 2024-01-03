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
import { Ticket } from "@/types/ticket";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Layout from "../layout";

function ViewTicket() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);

  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [preview, setPreview] = useState<(string | ArrayBuffer)[]>([]);
  const [showPicturesinfo, setShowPictures] = useState<boolean>(false);
  const [pictures, setPictures] = useState<string[]>([]);
  const [ticketInfo, setTicketInfo] = useState<any>(null);
  const ticketId = localStorage.getItem("currentticketID");
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [solution, setSolution] = useState("");
  const [reopen, setReopen] = useState("");
  const [currentTicket, setCurrentTicket] = useState<Ticket | undefined>(
    undefined,
  );

  useEffect(() => {
    checkAccount();
    getTicket();
  }, []);

  async function getTicket() {
    let tick = await fetch(
      API_BASE_URL + "/api/tickets/" + ticketId,
      getBaseQueryRequest(),
    ).then((data) => data.json());
    setCurrentTicket(tick);
    // setPictures(tick.files)
    // console.log(pictures)

    // return currentTicket;
  }

  useEffect(() => {
    showTicket();
  });

  async function handleCancel() {
    navigate(-1);
  }

  const checkAccount = () => {
    const accountClass = localStorage.getItem("Class");
    setIsClient(accountClass == "Client");
  };

  const handleRemove = (indexToRemove: number) => {
    const updatedPreview = [...preview];
    updatedPreview.splice(indexToRemove, 1);
    setPreview(updatedPreview);
  };

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    // const target = e.target as HTMLInputElement & {
    //   files: FileList;
    // }
    const fileList = e.target.files;

    if (fileList) {
      const allPreviews: (string | ArrayBuffer)[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (result) {
            allPreviews.push(result);
            // console.log(allPreviews);
            // You may want to set a state or perform other actions with 'result' here
            if (preview.length != null) {
              preview.forEach(function (item) {
                allPreviews.push(item);
              });
            }
            setPreview(allPreviews);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async function sendTicket(ticket: Ticket) {
    if (ticket) {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/tickets/" + ticket.ticketId,
          putBaseMutateRequest(JSON.stringify(ticket)),
        );

        if (!response.ok) {
          const errorResponse = await response.text(); // Capture response content
          throw new Error(
            `HTTP error! Status: ${response.status
            }. Error message: ${JSON.stringify(errorResponse)}`,
          );
        }
      } catch (error) { }
    }
  }

  async function showTicket() {
    if (currentTicket) {
      setShowTicketInfo(true);
      setTicketInfo(currentTicket);
    }
  }

  async function showPictures() {
    if (currentTicket) {
      setShowPictures(true);
      setPictures(currentTicket.files)
    }
  }

  async function changePriority() {
    if (currentTicket) {
      if (currentTicket.priority == "Critical") {
        currentTicket.priority = "Non critical";
      } else {
        currentTicket.priority = "Critical";
      }
      sendTicket(currentTicket);
      alert("Changed priority");
      navigate("/view-ticket");
    }
  }

  async function reopenTicket() {
    if (currentTicket) {
      if (reopen.length != 0) {
        currentTicket.notes = currentTicket.notes
          ? [...currentTicket.notes, reopen]
          : [reopen];
        currentTicket.status = "Open";
        sendTicket(currentTicket);
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

  async function closeTicket() {
    if (currentTicket) {
      if (solution.length != 0) {
        currentTicket.status = "Closed";
        currentTicket.solution = solution;
        sendTicket(currentTicket);
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

  async function handleSubmit() {
    if (currentTicket) {
      const filteredPreview: string[] = preview
        .filter((item) => typeof item === 'string')
        .map((item) => item as string);
      currentTicket.notes = currentTicket.notes
        ? [...currentTicket.notes, notes]
        : [notes];
      currentTicket.files = currentTicket.files
        ? [...currentTicket.files, ...filteredPreview]
        : [...filteredPreview];
      sendTicket(currentTicket);
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
              <div className="px-4 sm:px-0">
                <p className="text-md text-base font-semibold leading-7 text-gray-900">{ticketInfo.title}</p>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">ID: {ticketInfo.ticketId}</p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-md font-medium leading-6 text-gray-900">What is the problem?</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ticketInfo.problem}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-md font-medium leading-6 text-gray-900">What have you tried?</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ticketInfo.haveTried}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-md font-medium leading-6 text-gray-900">What should it be doing?</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ticketInfo.mustBeDoing}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-md font-medium leading-6 text-gray-900">Contact</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ticketInfo.phoneNumber}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-md font-medium leading-6 text-gray-900">Notes</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ticketInfo.notes &&
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
                      )}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <Button onClick={showPictures}>Show pictures</Button>
                    {pictures && (
                      <div className="flex max-w-screen flex-wrap">
                        {pictures.map((previewItem, index) => (
                          <div key={index} className="m-4 flex items-center">
                            <img
                              src={previewItem as string}
                              alt={`Preview ${index}`}
                              style={{ maxWidth: "500px", maxHeight: "400px" }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </dl>
              </div>
            </div>
          )}
          {/* Hij checkt hieronder eerst of de ticket open is, anders kan je namelijk niks meer toevoegen, dan krijg je wel de optie om hem te heropenen */}
          {currentTicket?.status === "Open" ||
            currentTicket?.status === "In Process" ? (
            <>
              <div className="grid gap-2 flex-grid.">
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
                        <Button variant="secondary" onClick={closeTicket}>
                          Submit
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Toaster />
                <h2 className="text-lg font-medium">Add notes</h2>
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
                <Button variant="default" onClick={handleSubmit}>
                  Submit
                </Button>
                <Button variant="destructive" onClick={handleCancel}>
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
              <Button variant="destructive" onClick={handleCancel}>
                Go back
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout >
  );
}

export default ViewTicket;
