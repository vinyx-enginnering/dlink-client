import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register, user_validate } from "../actions/user";
import Select from "react-select";

const Register = () => {
  const [fullname, setFullName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(1000);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitSelectedPlan = (e) => setSelectedPlan(e.value);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading: reg_loading, error: reg_error, userInfo } = userRegister;

  const validateUser = useSelector((state) => state.validateUser);
  const { loading, error, valid } = validateUser;

  useEffect(() => {
    if (userInfo) {
      return navigate("/dashboard");
    }
    
  }, [dispatch, navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const squadInstance = new window.squad({
      key: "pk_6877956d4719eaaa3ea69739d1b9c9f3a4d83da0",
      amount: selectedPlan * 100,
      email: email,
      currency_code: "NGN",
      onClose: () => console.log("Payment Cancled"),
      onLoad: () => console.log("Payment Process Started..."),
      onSuccess: () =>
        dispatch(register(selectedPlan, fullname, phone_number, email, password)),
    });

    squadInstance.setup();
    squadInstance.open();
  };

  const validateMe = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      fullname === "" ||
      password === "" ||
      phone_number === ""
    ) {
      return alert("Kindly fill in all fields");
    } else {
      dispatch(user_validate(email));
    }
  };

  const paymentOptions = [
    { value: 1000, label: "1,000 (Monthly plan)" },
    { value: 10000, label: "10,000 (Yearly plan)" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        marginTop: "20px",
      }}
    >
      <FormContainer>
        <div style={{ display: "flex" }}>
          <h3
            className=""
            style={{ color: "#8c5eff", margin: "8px 0px", padding: "0px" }}
          >
            {" "}
            Doublelink Business
          </h3>
        </div>

        <p className="lead m-0 p-0 mb-0">Create an account</p>
      <hr />
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {reg_loading && <Loader />}
        {reg_error && <Message variant="danger">{error}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="gender" className="mb-3">
            <Form.Label>Phone Number </Form.Label>
            <Form.Control
              type="text"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Select Plan</Form.Label>
          <Select options={paymentOptions} onChange={submitSelectedPlan} />
        </Form.Group>

          <div className="mt-2">
            By continuing you agree to all{" "}
            <a href="/privacy" style={{ color: "#8c5eff" }}>
              Terms & Conditions
            </a>
          </div>
         

          <Row>
            <Col>
              <div className="d-grid gap-2">
                <Button
                  onClick={validateMe}
                  variant="primary"
                  className="mt-3"
                  style={{ backgroundColor: "#8c5eff", border: "none" }}
                >
                  Validate
                </Button>
              </div>
            </Col>
            <Col>
              <div className="d-grid gap-2">
                {valid && (
                  <Button
                    type="submit"
                    variant="primary"
                    className="mt-3"
                    style={{ backgroundColor: "#8c5eff", border: "none" }}
                  >
                    Continue
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Form>

        <Row className="py-3">
          <Col>
            Have an account ? <Link to={"/login"}>Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Register;
