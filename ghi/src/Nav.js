import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogOutMutation } from "./app/authApi";
import { useNavigate } from "react-router-dom";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";
import { useEffect } from "react";
import { Button } from "reactstrap";
import "./nav.css";
import profile from "./profile.png";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";

function LogoutButton() {
  const navigate = useNavigate();
  const [logOut, { data }] = useLogOutMutation();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Button color="white" onClick={logOut}>
      Log out
    </Button>
  );
}

function Nav({ direction, ...args }) {
  const { data: token } = useGetTokenQuery();
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
  return (
    <>
      <nav className="navbar custom d-flex">
        <div className="customcontainer">
          <NavLink className="navbar-brand navbarleft" to="/">
            <p className="letter navbarmargin">TaskBoss</p>
          </NavLink>
          {token ? (
            <>
              <div className="buttonspace2">
                <Button color="white">
                  <NavLink className="nav-link" to="/calendar">
                    Calendar
                  </NavLink>
                </Button>
              </div>
              <div className="buttonspace">
                <Dropdown
                  isOpen={dropdownOpen1}
                  toggle={toggle1}
                  direction={direction}
                >
                  <DropdownToggle caret color="white">
                    Activities
                  </DropdownToggle>
                  <DropdownMenu {...args}>
                    <DropdownItem>
                      <NavLink className="nav-link" to="/activityform">
                        Create an Activity
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink className="nav-link" to="/activitylist">
                        Activity List
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="buttonspace">
                <LogoutButton />
              </div>
              <div className="buttonspace">
                <NavLink className="nav-link" to="/accountinformation">
                  <img
                    className="logo"
                    width="25"
                    src={profile}
                    alt={profile}
                  />
                </NavLink>
              </div>
            </>
          ) : (
            <div className="buttonspace">
              <Button color="white">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </Button>
            </div>
          )}
        </div>
      </nav>
      <LogInModal />
      <SignUpModal />
    </>
  );
}

export default Nav;
