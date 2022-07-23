import React from "react";
import "./AccountTypeSelection.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountTypeSelection = () => {
  const navigate = useNavigate();

  const navigationHandler = async (type) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    await axios
      .patch(
        "http://localhost:5000/api/user/userAccountType",
        { accountType: type },
        config
      )
      .then((res) => {
        console.log(res);
        if (res.data.accountType === "ADMIN") {
          navigate("/admin");
        } else if (res.data.accountType === "STUDENT") {
          navigate("/student");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="account-selection-container-angry-grid">
        <div id="account-selection-container-item-0">
          <p className="account-selection-container-header-text">
            Select user type to proceed..
          </p>
        </div>
        <div id="account-selection-container-item-1">
          <div
            className="account-selection-container-admin-box"
            onClick={() => {
              navigationHandler("ADMIN");
            }}
          >
            Admin
          </div>
        </div>
        <div id="account-selection-container-item-2">
          <div
            className="account-selection-container-student-box"
            onClick={() => {
              navigationHandler("STUDENT");
            }}
          >
            Student
          </div>
        </div>
        <div id="account-selection-container-item-3"></div>
      </div>
    </>
  );
};

export default AccountTypeSelection;
