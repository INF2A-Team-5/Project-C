import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

function AddSolution() {
  useAuthenticated();

  const [problemDescription, setProblemDescription] = useState("");
  const [solutionDescription, setSolutionDescription] = useState("");
  const [ticketId, setTicketId] = useState(0);
  const navigate = useNavigate();

  async function handleSubmit() {
    if (problemDescription == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter description of the problem.",
      });
    } else if (solutionDescription == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a description of the solution.",
      });
    } else if (!ticketId || isNaN(ticketId)) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a valid ticket ID.",
      });
    }

    //post request
    else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("Token"),
        },
        body: JSON.stringify({
          problemDescription: problemDescription,
          solutionDescription: solutionDescription,
          ticketId: ticketId,
        }),
      };
      fetch("http://localhost:5119/api/solutions", requestOptions).then(
        (response) => response.json()
      );

      toast({
        variant: "default",
        title: "Succes!",
        description: "Solution added successfully.",
      });
      navigate("/admin");
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
      <Button className="w-fit" variant="default" onClick={handleSubmit}>
        Upload ticket Solution
      </Button>
    </div>
  );
}

export default AddSolution;