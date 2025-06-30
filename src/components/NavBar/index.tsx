import { Link, NavLink } from "react-router-dom";

export function NavBar() {

  return (
    <div style={{ backgroundColor: "rgba(1, 24, 38)" }}>
      <nav className="navbar navbar-expand">
        <div className="col-4 d-flex justify-content-center align-items-center">
          <Link to="/" className="navbar-brand">
            VESS
          </Link>
        </div>
        <div className="col-4">
          <ul className="navbar-nav justify-content-center align-items-center">           
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link text-white")} style={{ color: "grey" }}>
                Início
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
