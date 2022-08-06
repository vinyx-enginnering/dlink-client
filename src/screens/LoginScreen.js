import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/user.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
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

        <p className="lead m-0 p-0">Login to continue</p>
        <hr />
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
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

          <div className="form-check mt-1">
            <label className="form-check-label text-muted">
              <input type="checkbox" className="form-check-input" />
              <i className="input-helper"></i>
              Keep me signed in
            </label>
          </div>

          <div className="d-grid gap-2">
            <Button
              type="submit"
              variant="primary"
              className="btn-block mt-3"
              style={{ backgroundColor: "#8c5eff", border: "none" }}
            >
              Login
            </Button>
          </div>
        </Form>

        <Row className="py-3">
          <Col>
            Create an account ? <Link to={"/register"}>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Login;
