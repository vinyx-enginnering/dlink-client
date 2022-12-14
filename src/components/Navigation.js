import React, { Fragment, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/user";
import { FaSignInAlt } from "react-icons/fa";

import FloatingWhatsApp from "react-floating-whatsapp";

const Navigation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Fragment>
      <Navbar expand="lg" variant="dark" style={{ backgroundColor: "#8c5eff" }}>
        <Container>
          <Navbar.Brand href="/">
            <span style={{ fontSize: "1.6rem", marginTop: "10px" }}>
              Doublelink
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-light lead" href="/">
                Home
              </Nav.Link>

              <Nav.Link className="text-light lead" href="/privacy">
                Legal
              </Nav.Link>
              <Nav.Link className="text-light lead" href="/faq">
                FAQs
              </Nav.Link>

              <Nav.Link className="text-light lead" href="/feature">
                Features
              </Nav.Link>

              <Nav.Link className="text-light lead" href="/contact">
                Contact
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
              <Nav.Link className="text-light lead" href="/login">
                Login <FaSignInAlt />{" "}
              </Nav.Link>
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
