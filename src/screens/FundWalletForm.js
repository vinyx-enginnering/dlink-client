import React, { useState, useEffect } from "react";
import { Container, Accordion, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fundCustomerWallet } from "../actions/wallet.js";
import Message from "../components/Message.js";

function FundWalletForm() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [customer, setCustomer] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const fundedWallet = useSelector((state) => state.fundWallet);
  const {
    loading: wallet_loading,
    error: wallet_error,
    transaction,
  } = fundedWallet;

  const submitHandler = (e) => {
    e.preventDefault();

    var transRef = randomReference();

    const squadInstance = new window.squad({
      key: "pk_6877956d4719eaaa3ea69739d1b9c9f3a4d83da0",
      amount: amount * 100,
      transaction_ref: transRef,
      email: userInfo && userInfo.email,
      currency_code: "NGN",
      onClose: () => console.log("Payment Cancled"),
      onLoad: () => console.log("Payment Process Started..."),
      onSuccess: () =>
        dispatch(fundCustomerWallet(amount, "Funded Wallet", transRef)),
    });

    squadInstance.setup();
    squadInstance.open();
  };

  //generate a random transaction ref
  function randomReference() {
    var length = 10;
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  //callback function that gets triggered on payment success or failure
  function paymentCallback(response) {
    if (response != null) {
      console.log(response);
    }
  }

  return (
    <Container className="bg-light">
      {transaction && (
        <Message variant="success">{transaction.narration}</Message>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Customer</Form.Label>
          <Form.Control
            type="text"
            disabled
            placeholder={userInfo && userInfo.fullname}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control
            type="email"
            disabled
            placeholder={userInfo && userInfo.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Amount in <span style={{ color: "#8c5eff" }}>Naira</span>
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Payment Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <div className="d-grid">
          <input
            type="submit"
            className="btn btn-primary"
            placeholder="Pay Now"
          />
        </div>
      </Form>
    </Container>
  );
}

export default FundWalletForm;
