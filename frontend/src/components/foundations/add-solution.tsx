import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Icons } from "./icons";
import { API_BASE_URL, postBaseMutateRequest } from "@/lib/api";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { useTranslation } from "react-i18next";

function AddSolution({ setOpen }: { setOpen: (_: boolean) => void }) {
  const { t } = useTranslation();

  const [problemDescription, setProblemDescription] = useState("");
  const [solutionDescription, setSolutionDescription] = useState("");
  const [ticketId, setTicketId] = useState<number | string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setIsLoading(true);
    if (problemDescription == "") {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.enter_problem_description"),
      });
      setIsLoading(false);
    } else if (solutionDescription == "") {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.enter_solution_description"),
      });
      setIsLoading(false);
    } else if (!ticketId || ticketId === "") {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.enter_valid_ticketId"),
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
      ).then((response) => response.json());

      toast({
        variant: "default",
        title: t("toast.successtitle"),
        description: t("toast.solution_added"),
      });
      setIsLoading(false);
      setOpen(false);
      navigate("/solutions");
      setProblemDescription("");
      setSolutionDescription("");
      setTicketId("");
    }
  }

  return (
    <div className="grid gap-2">
      <Textarea
        placeholder={t("solution.description")}
        onChange={(e) => setProblemDescription(e.currentTarget.value)}
        value={problemDescription}
      ></Textarea>
      <Textarea
        placeholder={t("solution.solution")}
        onChange={(e) => setSolutionDescription(e.currentTarget.value)}
        value={solutionDescription}
      ></Textarea>
      <Input
        placeholder={t("solution.id")}
        onChange={(e) => setTicketId(parseInt(e.currentTarget.value))}
        value={ticketId}
      />
      <DialogFooter>
        <DialogClose>
          <Button variant="outline">{t("solution.close")}</Button>
        </DialogClose>
        <Button className="w-fit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {t("solution.add")}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default AddSolution;
