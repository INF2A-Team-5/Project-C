import { useAuthenticated } from "./lib/hooks/useAuthenticated";
import { LogIn } from "lucide-react";

function App() {
  useAuthenticated();

  return (
    <div>
      <LogIn />
    </div>
  );
}

export default App;
