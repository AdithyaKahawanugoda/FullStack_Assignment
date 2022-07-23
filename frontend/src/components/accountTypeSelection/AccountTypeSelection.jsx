import React from "react";
import "./AccountTypeSelection.css";

const AccountTypeSelection = () => {
  return (
    <>
      <div class="account-selection-container-angry-grid">
        <div id="account-selection-container-item-0">
          <p className="account-selection-container-header-text">
            Select user type to proceed..
          </p>
        </div>
        <div id="account-selection-container-item-1">
          <div className="account-selection-container-admin-box">Admin</div>
        </div>
        <div id="account-selection-container-item-2">
          <div className="account-selection-container-student-box">Student</div>
        </div>
        <div id="account-selection-container-item-3"></div>
      </div>
    </>
  );
};

export default AccountTypeSelection;
