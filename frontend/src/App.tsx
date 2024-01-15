import { useEffect } from "react";
import LogIn from "./components/pages/auth/log-in";
import { useAuthenticated } from "./lib/hooks/useAuthenticated";
import i18next from "i18next";

function App() {
  useAuthenticated();

  return (
    <div>
      <LogIn />
    </div>
  );
}

export default App;
