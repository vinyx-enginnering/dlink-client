import React, { Fragment, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/user";
import {
  FaArrowUp,
  FaBell,
  FaCog,
  FaFireAlt,
  FaHandsHelping,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import CustomContainer from "../components/CustomContainer";
import SideBar from "./SideBar";
import FloatingWhatsApp from "react-floating-whatsapp";

const Navigation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logout_controller = () => {
    if (userInfo) {
      dispatch(logout());
    }
  };

  return (
    <Fragment>
      <Navbar
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#8c5eff" }}
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand href="/dashboard">
            <span style={{ fontSize: "1.6rem", marginTop: "10px" }}>
              Business Portal
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {userInfo && (
                <Nav.Link>
                  <SideBar />
                </Nav.Link>
              )}
              <Nav.Link className="text-light lead" href="/contact">
                <FaHandsHelping size={30} />
                Support
              </Nav.Link>

              {/* {userInfo && (
                <Nav.Link className="text-light" href="/upgrade-account">
                  Upgrade your permission & make more <FaFireAlt color="red" />
                </Nav.Link>
              )} */}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="">
              {!userInfo && (
                <Nav.Link className="text-light lead" href="/login">
                  Login <FaSignInAlt />{" "}
                </Nav.Link>
              )}

              {userInfo && (
                <Nav.Link
                  className="text-light lead bg-light"
                  href="#"
                  onClick={logout_controller}
                >
                  <FaSignOutAlt size={30} color="#8c5eff" />{" "}
                </Nav.Link>
              )}
              {userInfo && (
                <Nav.Link
                  className="text-light lead bg-light mx-2"
                  href="/dashboard/settings"
                >
                  <FaCog size={30} color="#8c5eff" />{" "}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <FloatingWhatsApp
        phoneNumber="2349051375350"
        accountName="Doublelink Support"
        statusMessage="Typically replies within 2 mins"
        allowClickAway
        notification
        notificationDelay={180000}
        notificationSound={false}
        avatar={require("../assets/images/icon.png")}
      />
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
