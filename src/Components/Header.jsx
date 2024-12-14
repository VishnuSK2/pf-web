import React, { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { HiMiniCube } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TokenAuthContext } from "../ContextAPI/TokenAuth";

function Header({ insideDashboard }) {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("token");
    setIsAuthorized(false);
    navigate("/");
  };
  return (
    <div className="bg-light shadow p-1">
      <Navbar expand="lg">
        <div className="container-fluid px-4">
          <Navbar.Brand className="text-info fw-bold">
            <Link
              to={"/"}
              className="text-info fw-bold"
              style={{ textDecoration: "none" }}
            >
              <HiMiniCube className="me-1 fs-3" />
              Project-Fair
            </Link>
          </Navbar.Brand>
          {insideDashboard && (
            <button
              className="btn btn-light text-info fw-bold ms-auto  custom-hover"
              onClick={handleLogOut}
            >
              Logout
            </button>
          )}
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
