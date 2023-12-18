import LogIn from "./components/pages/auth/log-in";
import { useAuthenticated } from "./lib/hooks/useAuthenticated";

function App() {
  useAuthenticated();
  localStorage.clear();
  return (
    <div>
      <LogIn />
    </div>
  );
}

export default App;
