import React from "react";
import "./Student.css";
import { ContainerCard, Notes, AddNewNote } from "../../components/index";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("accountType");
    navigate("/");
  };

  return (
    <>
      <div className="student-page-angry-grid">
        <div id="student-page-item-0">
          <ContainerCard>
            <AddNewNote />
          </ContainerCard>
        </div>
        <div id="student-page-item-1">
          <ContainerCard>
            <Notes />
          </ContainerCard>
        </div>
        <div id="student-page-item-2">
          <div className="student-page-header">STUDENT VIEW</div>
          <div className="student-page-header-options" onClick={logoutHandler}>
            LOG OUT
          </div>
        </div>
        <div id="student-page-item-3"></div>
        <div id="student-page-item-4"></div>
        <div id="student-page-item-5"></div>
        <div id="student-page-item-6"></div>
        <div id="student-page-item-7"></div>
      </div>
    </>
  );
};

export default Student;
