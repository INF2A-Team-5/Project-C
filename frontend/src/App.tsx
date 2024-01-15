import LogIn from "./components/pages/auth/log-in";
import { useAuthenticated } from "./lib/hooks/useAuthenticated";

function App() {
  useAuthenticated();
  localStorage.removeItem("Token");
  localStorage.removeItem("username");
  localStorage.removeItem("Id");
  localStorage.removeItem("Class");
  localStorage.removeItem("currentaccountID");
  localStorage.removeItem("currentticketID");
  localStorage.removeItem("currentmachineID");

  return (
    <div>
      <LogIn />
    </div>
  );
}

export default App;
