import "./navbar.css";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link as L, animateScroll as scroll } from "react-scroll";
const NavBar = () => {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const PF = "http://localhost:5000/images/";
  return (
    <div className="nav-parent">
      <div className="nav-container">
        <div className="nav-logo">
          <L
            activeClass="active"
            to="hero-section"
            spy={true}
            smooth={true}
            offset={-30}
            duration={600}
          >
            Write<span style={{ color: "#e7db28" }}>It</span>
          </L>
        </div>
        <ul className="nav-items">
          <li className="nav-item">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <L
              activeClass="active"
              to="about-section"
              spy={true}
              smooth={true}
              offset={-30}
              duration={600}
            >
              About
            </L>
          </li>
          <li className="nav-item">
            <Link className="link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li className="nav-item nav-logout" onClick={handleLogout}>
            {user && "logout"}
          </li>
        </ul>
        <div className="nav-user">
          {user ? (
            <Link to="/settings">
              <img
                className="user-profile-img"
                src={PF + user.profilePic}
                alt=""
              />
            </Link>
          ) : (
            <>
              <li className="nav-item">
                <Link className="link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
          <i class="fas fa-search"></i>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
