import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="fixed z-10 flex h-24 w-full items-center border-b border-border bg-background">
        <div className="ml-4 flex items-center">
          <img
            className="h-14 pr-2"
            src="/viscon_logo_transparant.png"
            alt="Viscon Logo"
          />
          <h1 className="text-5xl font-medium">VISCON</h1>
        </div>
        <nav className="flex items-center space-x-4 pl-8 lg:space-x-8">
          <Link
            to="/tickets"
            className="text-4xl font-medium text-primary transition-colors hover:text-primary"
          >
            Tickets
          </Link>
          <Link
            to="/machines"
            className="text-4xl font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Machines
          </Link>
          <Link
            to="/solutions"
            className="text-4xl font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Solutions
          </Link>
          <Link
            to="/admin"
            className="text-4xl font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Admin
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
