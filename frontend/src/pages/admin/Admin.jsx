import React, { useEffect, useState } from "react";
import "./Admin.css";
import { ContainerCard, Users } from "../../components/index";

const Admin = () => {
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {}, []);

  return (
    <>
      <div className="admin-page-angry-grid">
        <div id="admin-page-item-0">
          <div>
            <div>ADMIN VIEW</div>
            <div>LOG OUT</div>
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
