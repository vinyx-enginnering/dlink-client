import React, { useEffect, useState, useRef, Fragment, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCard } from "../actions/card";
import ReactToPrint from "react-to-print";
import { get_user } from "../actions/user.js";
import DateFormatter from "react-date-formatter";

function Etisalat100Voucher() {
  const dispatch = useDispatch();

  const componentRef = useRef();

  useEffect(() => {
    dispatch(getCard("9mobile"));
  }, []);

  const getVoucher = useSelector((state) => state.getVoucher);
  const { loading, error, pins } = getVoucher;

  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;

  useMemo(() => dispatch(get_user()), [0]);

  return (
    <Fragment>
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-md mx-4 my-2 mt-1 btn-dark">
            Print this out!
          </button>
        )}
        content={() => componentRef.current}
      />

      <div
        className="p-2"
        ref={componentRef}
        style={{
          display: "grid",
          gridTemplateColumns: "260px 260px 260px 260px",
          background: "white",
        }}
      >
        {error && <p variant="danger">{error}</p>}

        {pins &&
          pins.vouchers.filter(voucher => voucher.pin !== "NaN").map((pin) => (
            <div
              style={{
                height: "94px",
                width: "260px",
                border: "2px solid black",
                lineHeight: "15px",
                margin: "2px",
                fontSize: "10px",
                padding: "2px",
              }}
              key={pin._id}
            >
              <div style={{ height: "90px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "20px",
                  }}
                >
                  <p
                    className="text-light px-1 pt-1 lead"
                    style={{
                      width: "50%",
                      borderBottomRightRadius: "20px",
                      height: "22px",
                      backgroundColor: "black",
                    }}
                  >
                    {user && user ? user.company_name : "Double Link"}
                  </p>
                  <h4
                    className=""
                    style={{
                      width: "50%",
                      textAlign: "right",
                      paddingRight: "5px",
                    }}
                  >
                    N100
                  </h4>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="px-1 py-1" style={{ width: "90%" }}>
                    <p className="p-0 m-0">Serial: {pin.serial_number}</p>
                    <p
                      className="p-0 m-0 lead"
                      style={{ fontWeight: "900", fontSize: "1rem" }}
                    >
                      PIN: {pin.pin}
                    </p>
                    <p className="p-0 m-0" style={{ margin: "-2px" }}>
                      Ref No: {pin._id}
                    </p>
                    <p
                      className="p-0 m-0 text-success"
                      style={{ fontSize: "13px" }}
                    >
                      9mobile{" "}
                      <span style={{ fontSize: "13px" }}>
                        {DateFormatter(pin.createdAt).shortDate()}
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      width: "20%",
                      textAlign: "right",
                      paddingRight: "5px",
                      paddingTop: "5px",
                    }}
                  >
                    <img
                      src={require("../assets/images/9mobile.png")}
                      style={{ width: "40px", height: "40px" }}
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
}

export default Etisalat100Voucher;
