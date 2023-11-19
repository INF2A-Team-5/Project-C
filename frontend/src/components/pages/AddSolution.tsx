import Input from '../foundations/input'
import Button from '../foundations/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Settings from '../foundations/settings'

function AddSolution() {
  const [problemDescription, setProblemDescription] = useState('');
  const [solutionDescription, setSolutionDescription] = useState('');
  const [ticketId, setTicketId] = useState(0);
  const navigate = useNavigate();

  async function handleSubmit() {
    
    if (problemDescription == "")
    {
      alert("Enter description of the problem");
    }    
    
    else if (solutionDescription == "")
    {
      alert("Enter a description of the solution");
    }

    else if (!ticketId || isNaN(ticketId)) {
      alert("Enter a valid ticket ID");
    }

    //post request
    else
    {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"solutionId": 0, "problemDescription": problemDescription, "solutionDescription": solutionDescription, "ticketId": ticketId})
      };
      fetch('http://localhost:5119/api/solutions', requestOptions)
        .then(response => response.json())
        .then(data => alert("Solution added"));  
      
      navigate('/admin')
    }

}

  return (
    <div className='text-center'>
        <h2>Add Solution</h2>
        <div>
          <Input hierarchy='md' name='username' placeholder='Enter Description of the Problem'
          onChange={e => setProblemDescription(e.currentTarget.value)}
          />
        </div>
        <h3></h3>
        <div>
          <Input hierarchy='md' name='username' placeholder='Enter a Description of the Solution'
          onChange={e => setSolutionDescription(e.currentTarget.value)}
          />
        </div>
        <h3></h3>
        <div>
          <Input hierarchy='md' name='username' placeholder='Enter Ticket ID'
          onChange={e => setTicketId(parseInt(e.currentTarget.value))}
          />
        </div>
        <br />
        <Settings></Settings>
        <Button hierarchy='xl' type="primary" onClick={handleSubmit} rounded="slight">Add Solution</Button>
        <h3></h3>
        <Button hierarchy='md' type="destructive" onClick={() => window.location.href='/admin'} rounded="slight">Back</Button>
    </div>
  );
}

export default AddSolution;