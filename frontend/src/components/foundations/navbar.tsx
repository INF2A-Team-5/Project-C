import { Link, useLocation } from "react-router-dom";
import Settings from "./settings";

const navItems = [
  { label: "Tickets", path: ["/tickets", "/create-ticket"] },
  { label: "Machines", path: ["/machines"] },
  { label: "Departments", path: ["/departments"] },
  { label: "Accounts", path: ["/accounts"] },
];

function Navbar() {
  const location = useLocation();
  // const role = localStorage.getItem("Role");

  return (
    <>
      <div className="sticky top-0 z-10 flex h-16 w-full justify-center border-b border-border bg-background px-4 md:px-6">
        <div className="flex w-full max-w-screen items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center border-r border-border pr-12">
              <img
                className="h-8"
                src="/viscon_logo_transparant.png"
                alt="Viscon Logo"
              />
              <h1 className="ml-2 text-xl font-medium">VISCON</h1>
            </div>
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path[0]}
                  className={`text-md font-medium transition-colors duration-300 hover:text-primary ${
                    item.path.includes(location.pathname)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Settings />
        </div>
      </div>
    </>
  );
}

export default Navbar;
