import LogIn from "./components/pages/auth/log-in";
import { useAuthenticated } from "./lib/hooks/useAuthenticated";

function App() {
  useAuthenticated();

  return (
    <div>
      <LogIn />
    </div>
  );
}

export default App;
