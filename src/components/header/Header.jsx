import { useAuth } from "../../context/authContext/AuthContext";
import { Logout } from "../logout/Logout";

export const Header = () => {
  const { userLoggedIn, currentUser } = useAuth();

  const getName = (email) => {
    if (!email) return "User";
    let firstPart = email.split("@")[0];
    let secondPart = firstPart.split(".")[0];
    return secondPart || "User";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Holiday Photos
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </a>
              <ul className="dropdown-menu">
                {userLoggedIn ? (
                  <>
                    <li key="user-name">
                      <a className="dropdown-item" href="#">
                        {getName(currentUser.email)}
                      </a>
                    </li>
                    <li key="logout">
                      <Logout />
                    </li>
                  </>
                ) : (
                  <>
                    <li key="login">
                      <a className="dropdown-item" href="#">
                        Login
                      </a>
                    </li>
                    <li key="Register">
                      <a className="dropdown-item" href="#">
                        Register
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
