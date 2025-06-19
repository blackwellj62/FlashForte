import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import { logout } from "../../managers/authManager";
import forteRound from "/src/assets/forteRound.png";
import "./Nav.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Offcanvas } from "bootstrap"

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();

  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById("offcanvasDarkNavbar");
    const bsOffcanvas = Offcanvas.getInstance(offcanvasElement);
    if (bsOffcanvas) {
      bsOffcanvas.hide();
    }
  };
 

  return (
    <nav className="navbar navbar-dark  fixed-top">
      <div className="container-fluid">
        <RRNavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={forteRound} alt="Flash Forte Logo" className="logo me-2" />
          
        </RRNavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              {loggedInUser ? loggedInUser.userName : ""}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <RRNavLink to="/" className="nav-link" onClick={closeOffcanvas}>
                Home
                </RRNavLink>
              </li>
              <li className="nav-item">
                <RRNavLink to="flashcards" className="nav-link" onClick={closeOffcanvas}> 
                Flash Cards
                </RRNavLink>
              </li>
              <li className="nav-item">
                <RRNavLink to="decks" className="nav-link" onClick={closeOffcanvas}> 
                Decks
                </RRNavLink>
              </li>
               <li className="nav-item">
                <RRNavLink to="new-card" className="nav-link" onClick={closeOffcanvas}>
                New Card
                </RRNavLink>
              </li>
              <li className="nav-item">
                <RRNavLink to="new-deck" className="nav-link" onClick={closeOffcanvas}>
                New Deck
                </RRNavLink>
              </li>
            </ul>

            {loggedInUser ? (
              <button
                className="btn btn-outline-light mt-3"
                onClick={(e) => {
                  e.preventDefault();
                  logout().then(() => {
                    setLoggedInUser(null);
                    closeOffcanvas()
                    navigate("/");
                  });
                }}
              >
                Logout
              </button>
            ) : (
              <RRNavLink to="/login" className="btn btn-success mt-3" onClick={closeOffcanvas}>
                Login
              </RRNavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}