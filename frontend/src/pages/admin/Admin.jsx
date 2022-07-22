import React from "react";
import "./Admin.css";
import { ContainerCard } from "../../components/index";

const Admin = () => {
  return (
    <>
      <div className="admin-page-angry-grid">
        <div id="admin-page-item-0">&nbsp;0</div>
        <div id="admin-page-item-1">
          <ContainerCard>User List section</ContainerCard>
        </div>
        <div id="admin-page-item-2">&nbsp;2</div>
        <div id="admin-page-item-3">&nbsp;3</div>
        <div id="admin-page-item-4">
          <ContainerCard>Pagination section</ContainerCard>
        </div>
        <div id="admin-page-item-5">&nbsp;5</div>
      </div>
    </>
  );
};

export default Admin;
