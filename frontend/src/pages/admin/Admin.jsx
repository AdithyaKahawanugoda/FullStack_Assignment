import React from "react";
import "./Admin.css";
import { ContainerCard, Users } from "../../components/index";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("accountType");
    navigate("/");
  };

  return (
    <>
      <div className="admin-page-angry-grid">
        <div id="admin-page-item-0">
          <div className="admin-page-header">ADMIN VIEW</div>
          <div className="admin-page-header-options" onClick={logoutHandler}>
            LOG OUT
          </div>
        </div>
        <div id="admin-page-item-1">
          <ContainerCard>
            <Users />
          </ContainerCard>
        </div>
        <div id="admin-page-item-2"></div>
        <div id="admin-page-item-3"></div>
        <div id="admin-page-item-4"></div>
      </div>
    </>
  );
};

export default Admin;
