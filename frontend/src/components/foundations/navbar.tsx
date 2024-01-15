import { Link, useLocation } from "react-router-dom";
import Settings from "./settings";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();

  const location = useLocation();
  let navItems = [
    {
      label: t("navbar.tickets"),
      path: ["/tickets", "/create-ticket", "/view-ticket"],
    },
  ];  
  if (
    localStorage.getItem("Class") == "ServiceEmployee" ||
    localStorage.getItem("Class") == "Admin"
  ) {
    navItems.push(
      { label: t("navbar.assigned"), path: ["/assigned-tickets"] },
      { label: t("navbar.unassigned"), path: ["/unassigned-tickets"] },
    );
  }
  navItems.push({ label: "Machines", path: ["/machines"] }
  )
  if (localStorage.getItem("Class") == "Admin") {
    navItems.push(
      { label: t("navbar.departments"), path: ["/departments"] },
      { label: t("navbar.accounts"), path: ["/accounts"] },
      { label: t("navbar.solutions"), path: ["/solutions"] },
    );
  }

  return (
    <>
      <div className="sticky top-0 z-10 flex h-16 w-full justify-center border-b border-border bg-background px-4 md:px-6">
        <div className="flex w-full max-w-screen items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/tickets">
              <div className="flex items-center border-r border-border pr-12">
                <img
                  className="h-8"
                  src="/viscon_logo_transparant.png"
                  alt="Viscon Logo"
                />
                <h1 className="ml-2 text-xl font-medium">VISCON</h1>
              </div>
            </Link>
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
