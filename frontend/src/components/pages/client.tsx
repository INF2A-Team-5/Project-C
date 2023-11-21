import Button from "../foundations/button";
import React from 'react';
import Table from "../foundations/table";

function Client() {
  function toTicket() {
    window.location.href = window.location.href.replace("client", "tickets");
  }
  return (
    <div>
      <h1>Client</h1>
      <Table></Table>
      <div>
        <Button hierarchy="md" type="primary" onClick={toTicket}>Yes I have</Button>
      </div>
    </div>
  );
}

export default Client;