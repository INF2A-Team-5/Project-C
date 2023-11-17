import Button from "../foundations/button";
import Settings from '../foundations/settings'

function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <Settings></Settings>
      <Button hierarchy='xl' type="primary" onClick={() => window.location.href='/add-account'} rounded="slight">Add account</Button>
      <h3></h3>
      <Button hierarchy='xl' type="primary" onClick={() => window.location.href='/add-machine'} rounded="slight">Add machine</Button>
      <h3></h3>
      <Button hierarchy='xl' type="primary" onClick={() => window.location.href='/add-department'} rounded="slight">Add department</Button>
      <h3></h3>
      <Button hierarchy='xl' type="primary" onClick={() => window.location.href='/add-solution'} rounded="slight">Add solution</Button>
    </div>
  );
}

export default Admin;