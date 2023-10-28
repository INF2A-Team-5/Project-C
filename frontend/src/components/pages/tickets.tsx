import Button from '../foundations/button'
import React from 'react';
import AccountService from '../../services/AccountService';

// export interface Machine {
//   MachineId: number; Name: string; Description: string; AccountId: number
// }

// export interface Account {
//   AccountId: number; Name: string; Password: string; Class: number
// }

function Tickets() { 
  async function ChooseMachine() {
    const account = await fetch("http://localhost:5119/api/accounts").then((res) => res.json()).then(accounts => accounts.find((acc: any) => acc.accountId == 1))
    let machines = await fetch("http://localhost:5119/api/machines").then((res) => res.json()).then(machines => machines.filter((machine: any) => machine.accountId == account.accountId))
    console.log(machines)
  }
  return (
    <div>
      <h1>Tickets</h1>
      <Button onClick={ChooseMachine}>Refresh</Button>
    </div>
  )
}

export default Tickets