import React from "react";
import "./Student.css";
import { ContainerCard } from "../../components/index";

const Student = () => {
  return (
    <>
      <div class="student-page-angry-grid">
        <div id="student-page-item-0">
          <ContainerCard>Add new note section</ContainerCard>
        </div>
        <div id="student-page-item-1">
          <ContainerCard>Notes list section</ContainerCard>
        </div>
        <div id="student-page-item-2">&nbsp;2</div>
        <div id="student-page-item-3">&nbsp;3</div>
        <div id="student-page-item-4">&nbsp;4</div>
        <div id="student-page-item-5">&nbsp;5</div>
        <div id="student-page-item-6">&nbsp;6</div>
        <div id="student-page-item-7">&nbsp;7</div>
      </div>
    </>
  );
};

export default Student;
