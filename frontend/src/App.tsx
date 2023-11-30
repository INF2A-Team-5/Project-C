import { useAuthenticated } from "./lib/hooks/useAuthenticated";
import { Button } from "./components/ui/button";
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
