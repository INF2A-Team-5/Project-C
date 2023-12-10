import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, getBaseQueryRequest } from "@/lib/api";

function ViewTicket() {
  // const [account, SetAccount] = useState("");
  const [Ticket, SetTicket] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (Ticket == null) {
      getData();
    }
  });
  async function getData() {
    SetTicket(
      await fetch(API_BASE_URL + "/api/Tickets/1" + getBaseQueryRequest).then(
        (data) => data.json(),
      ),

      // await fetch(
      //   "http://localhost:5119/api/Tickets/1",

      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: "bearer " + localStorage.getItem("Token"),
      //       "Content-Type": "application/json",
      //     },
      //   }
      // ).then((data) => data.json())
    );
    // SetAccount(localStorage.getItem("Id")!);
  }
  // const tickettitle = Ticket?.Title;
  const TicketCreatedDate = Ticket?.date_Created;
  const Problem = Ticket?.problem;
  const Problem2 = Ticket?.mustBeDoing;
  const Problem3 = Ticket?.haveTried;
  const Files = Ticket?.files;
  // const Notes = Ticket?.notes;
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div>{TicketCreatedDate}</div>
      <h2>{Problem}</h2>
      <h2>{Problem2}</h2>
      <h2>{Problem3}</h2>
      <h2>{Files}</h2>
      {/* <div>{Notes}</div> */}
      <Button onClick={goBack}>Back</Button>
    </div>
  );
}

export default ViewTicket;
