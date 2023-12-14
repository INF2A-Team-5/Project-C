import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  // const role = localStorage.getItem("Role");

  const navItems = [
    { label: "Tickets", path: ["/tickets", "/create-ticket"] },
    { label: "Machines", path: ["/machines"] },
    { label: "Solutions", path: ["/solutions"] },
    { label: "Admin", path: ["/admin"] },
  ];
  return (
    <>
      <div className="fixed z-10 flex h-24 w-full items-center border-b border-border bg-background">
        <div className="ml-6 flex items-center">
          <img
            className="h-14 "
            src="/viscon_logo_transparant.png"
            alt="Viscon Logo"
          />
          {/* <h1 className="text-5xl font-medium">VISCON</h1> */}
        </div>
        <nav className="flex items-center space-x-4 pl-8 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path[0]}
              className={`text-3xl font-medium transition-colors duration-300 hover:text-primary ${
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
