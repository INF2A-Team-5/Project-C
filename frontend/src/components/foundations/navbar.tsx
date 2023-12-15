import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  // const role = localStorage.getItem("Role");

  const navItems = [
    { label: "Tickets", path: ["/tickets", "/create-ticket"] },
    { label: "Machines", path: ["/machines"] },
    { label: "Departments", path: ["/departments"] },
    { label: "Accounts", path: ["/accounts"] },
  ];
  return (
    <>
      <div className="fixed z-10 flex h-16 w-full items-center border-b border-border bg-background">
        <div className="ml-12 flex items-center">
          <img
            className="h-10"
            src="/viscon_logo_transparant.png"
            alt="Viscon Logo"
          />
          <h1 className="ml-2 text-3xl font-medium">VISCON</h1>
        </div>
        <nav className="flex items-center space-x-4 pl-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path[0]}
              className={`text-md font-medium transition-colors duration-300 hover:text-primary lg:px-4 ${
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
    </>
  );
}

export default Navbar;
