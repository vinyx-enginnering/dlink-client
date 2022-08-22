import React, { useState, useEffect } from "react";
import { Container, Accordion, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fundCustomerWallet } from "../actions/wallet.js";
import Message from "../components/Message.js";

function FundWalletScreen() {
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
    const fees = (amount * 1) / 100;

    // Pay with Monnify
    window.MonnifySDK.initialize({
      amount: amount,
      currency: "NGN",
      reference: `${new Date().getTime()}`,
      customerFullName: userInfo && userInfo.fullname,
      customerEmail: userInfo && userInfo.email,
      apiKey: "MK_PROD_YYE1WG2HE0",
      contractCode: "440026499445",
      paymentDescription: "Wallet Funding",
      metadata: {
        name: userInfo && userInfo.fullname,
        email: userInfo && userInfo.email,
      },
      incomeSplitConfig: [
        {
          subAccountCode: "MFY_SUB_480056987063",
          feePercentage: 20,
          splitAmount: (amount * 20) / 100,
          feeBearer: true,
        },
        {
          subAccountCode: "MFY_SUB_787486531526",
          feePercentage: 80,
          splitAmount: (amount * 80) / 100,
          feeBearer: true,
        },
      ],

      onLoadStart: () => {
        console.log("loading has started");
      },
      onLoadComplete: () => {
        console.log("SDK is UP");
      },

      onComplete: function (response) {
        //Implement what happens when the transaction is completed.

        if (response.status === "SUCCESS") {
          dispatch(fundCustomerWallet(amount, "Funded Wallet", transRef));
        }
      },
      onClose: function (data) {
        //Implement what should happen when the modal is closed here
        console.log(data);
      },
    });
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

  return (
    <Container className="bg-light py-1">
      <h3 className="mt-5" style={{ color: "#8c5eff" }}>
        Fund Your Wallet
      </h3>
      {transaction && (
        <Message variant="success">{transaction.narration}</Message>
      )}
      <p className="lead">Choose your payment option below</p>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Automatic Funding</Accordion.Header>
          <Accordion.Body>
            This method of payment supports cards, transfers and other payment
            options - most flexible
            <hr />
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
          </Accordion.Body>
        </Accordion.Item>
        
      </Accordion>
    </Container>
  );
}

export default FundWalletScreen;
