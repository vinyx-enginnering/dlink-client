import React, { useState, useEffect } from "react";
import { Form, Button, Modal, ListGroup, ListGroupItem } from "react-bootstrap";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { purchaseBulk } from "../actions/transaction";

function PurchaseBulkPins() {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);
  const [chosen, setChosen] = useState();

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const purchaseBulkPin = useSelector((state) => state.purchaseBulkPin);
  const { loading, error, transaction } = purchaseBulkPin;

  const networkOptions = [
    { value: "MTN", label: "MTN" },
    { value: "Airtel", label: "Airtel" },
    { value: "Glo", label: "Glo" },
    { value: "9mobile", label: "9Mobile" },
  ];

  const MtnOptions = [
    { value: "97.50", label: "MTN 100 [₦97.50]" },
    { value: "195.00", label: "MTN 200 [₦195.00]" },
    { value: "487.50", label: "MTN 500 [₦487.50]" },
  ];
  const AirtelOptions = [
    { value: "96.10", label: "Airtel 100 [₦96.10]" },
    { value: "192.20", label: "Airtel 200 [₦192.20]" },
    { value: "480.50", label: "Airtel 500 [₦480.50]" },
  ];
  const EtiOptions = [
    { value: "94.50", label: "9Mobile 100 [₦94.50]" },
    { value: "189.00", label: "9Mobile 200 [₦189.00]" },
    { value: "472.50", label: "9Mobile 500 [₦472.50]" },
  ];
  const GloOptions = [
    { value: "95.00", label: "Glo 100 [₦95.00]" },
    { value: "190.00", label: "Glo 200 [₦190.00]" },
    { value: "475.00", label: "Glo 500 [₦475.00]" },
  ];
  const quantityOptions = [
    { value: "20", label: "20" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "500", label: "500" },
  ];

  // const submitSelectedNetwork = (e) => setSelectedNetwork(e.value);
  const submitSelectedNetwork = (e) => {
    setSelectedNetwork(e.value);

    if (e.value === "MTN") {
      setChosen(MtnOptions);
    }

    if (selectedNetwork === "Airtel") {
      setChosen(AirtelOptions);
    }

    if (selectedNetwork === "Glo") {
      setChosen(GloOptions);
    }

    if (selectedNetwork === "9Mobile") {
      setChosen(EtiOptions);
    }
  };
  const submitSelectedAmount = (e) => setAmount(e.value);
  const submitSelectedQuantity = (e) => setQuantity(e.value);

  const submitHandler = (e) => {
    e.preventDefault();

    if (amount === "" || quantity === "" || selectedNetwork === "") {
      return alert("Kindly fill in all fields");
    } else {
      dispatch(purchaseBulk(selectedNetwork, amount, quantity));
      setShow(true);
    }

    setAmount("");
    setQuantity("");
    setSelectedNetwork("");
  };

  const setAmountOptions = () => {
    if (selectedNetwork === "MTN") {
    }

    

    return chosen;
  };

  return (
    <div>
      <p className="lead">Purchase Bulk E-Pins</p>
      <hr />
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Select Network</Form.Label>
          <Select options={networkOptions} onChange={submitSelectedNetwork} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Select Denomination</Form.Label>
          <Select options={chosen} onChange={submitSelectedAmount} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Select Quantity</Form.Label>
          <Select options={quantityOptions} onChange={submitSelectedQuantity} />
        </Form.Group>

        <Button variant="primary" style={{backgroundColor: "#8c5eff"}} type="submit">
          Place Order
        </Button>
      </Form>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Loader />}
          {error && (
            <p className="lead mb-2 bg-danger text-light p-2">{error}</p>
          )}
          
          {transaction && (
            <p
              className="lead mb-4 p-2 text-light"
              style={{ backgroundColor: "#8c5eff" }}
            >
              Your Order is placed!
            </p>
          )}
          {transaction && <p className="lead">Details</p>}
          {transaction && (
            <ListGroup>
              <ListGroupItem>Amount: ₦{transaction.denomination * transaction.quantity}</ListGroupItem>
              <ListGroupItem>Unit: {transaction.quantity} units</ListGroupItem>
              <ListGroupItem>Network: {transaction.network}</ListGroupItem>
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Alright
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PurchaseBulkPins;
