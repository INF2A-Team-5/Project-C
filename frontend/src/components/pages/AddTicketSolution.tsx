import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Icons } from "../foundations/icons";
import { API_BASE_URL, postBaseMutateRequest } from "@/lib/api";

function AddSolution() {
  useAuthenticated();

  const [problemDescription, setProblemDescription] = useState("");
  const [solutionDescription, setSolutionDescription] = useState("");
  const [ticketId, setTicketId] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setIsLoading(true);
    if (problemDescription == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter description of the problem.",
      });
      setIsLoading(false);
    } else if (solutionDescription == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a description of the solution.",
      });
      setIsLoading(false);
    } else if (!ticketId || isNaN(ticketId)) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a valid ticket ID.",
      });
      setIsLoading(false);
    } else {
      fetch(
        API_BASE_URL + "/api/solutions",
        postBaseMutateRequest(
          JSON.stringify({
            problemDescription: problemDescription,
            solutionDescription: solutionDescription,
            ticketId: ticketId,
          }),
        ),
        // {
        //   body: JSON.stringify({
        //     problemDescription: problemDescription,
        //     solutionDescription: solutionDescription,
        //     ticketId: ticketId,
        //   }),
        // },
      ).then((response) => response.json());

      // const requestOptions = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "bearer " + localStorage.getItem("Token"),
      //   },
      //   body: JSON.stringify({
      //     problemDescription: problemDescription,
      //     solutionDescription: solutionDescription,
      //     ticketId: ticketId,
      //   }),
      // };
      // fetch("http://localhost:5119/api/solutions", requestOptions).then(
      //   (response) => response.json()
      // );

      toast({
        variant: "default",
        title: "Succes!",
        description: "Solution added successfully.",
      });
      setIsLoading(false);
      switch (localStorage.getItem("Class")) {
        case "Admin":
          navigate("/admin");
          break;
        case "ServiceEmployee":
          navigate("/serviceEmployee");
          break;
      }
    }
  }

  return (
    <div className="grid gap-2">
      <Textarea
        placeholder="Enter Description of the Problem"
        onChange={(e) => setProblemDescription(e.currentTarget.value)}
      ></Textarea>
      <Textarea
        placeholder="Enter a Description of the Solution"
        onChange={(e) => setSolutionDescription(e.currentTarget.value)}
      ></Textarea>
      <Input
        placeholder="Enter Ticket ID"
        onChange={(e) => setTicketId(parseInt(e.currentTarget.value))}
      />
      <Button
        className="w-fit"
        variant="default"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Upload ticket Solution
      </Button>
    </div>
  );
}

export default AddSolution;
