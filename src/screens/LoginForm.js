import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login_mobile, logout_me } from "../actions/user.js";
import FundWalletForm from "./FundWalletForm";
import { FaSignOutAlt } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticate, setAuthenticate] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      setAuthenticate(true);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login_mobile(email, password));
  };

  const logout_controller = () => {
    if (userInfo) {
      dispatch(logout_me());
      setAuthenticate(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <FormContainer>
        <div style={{ display: "flex" }}>
          <h3
            className=""
            style={{ color: "#8c5eff", margin: "8px 0px", padding: "0px" }}
          >
            Doublelink Business
          </h3>
        </div>
        {authenticate === false ? (
          <p className="lead m-0 p-0">Authenticate to continue</p>
        ) : (
          <p className="lead m-0 p-0">Fund Wallet</p>
        )}
        {authenticate === true && (
          <p className="btn btn-sm btn-primary" onClick={logout_controller}>
            Logout <FaSignOutAlt />
          </p>
        )}
        <hr />
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {authenticate === false && (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                className="btn-block mt-3"
                style={{ backgroundColor: "#8c5eff", border: "none" }}
              >
                Authenticate
              </Button>
            </div>
          </Form>
        )}

        {authenticate == true && <FundWalletForm />}
      </FormContainer>
    </div>
  );
};

export default LoginForm;
