import { Link } from "react-router-dom";
import Button from "../foundations/button";
import Settings from "../foundations/settings";

function Admin() {
  return (
    <div className="text-center">
      <h1>Admin</h1>
      <Settings></Settings>
      <ul className="grid grid-cols-3">
        <li>
          <Link to="/add-account">
            <Button hierarchy="xl" type="primary" rounded="slight">
              Add account
            </Button>
          </Link>
        </li>
        <li>
          <Button
            hierarchy="xl"
            type="primary"
            onClick={() => (window.location.href = "/add-machine")}
            rounded="slight"
          >
            Add machine
          </Button>
        </li>
        <li>
          <Button
            hierarchy="xl"
            type="primary"
            onClick={() => (window.location.href = "/add-department")}
            rounded="slight"
          >
            Add department
          </Button>
        </li>
        <li>
          <Button
            hierarchy="xl"
            type="primary"
            onClick={() => (window.location.href = "/add-solution")}
            rounded="slight"
          >
            Add solution
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default Admin;
