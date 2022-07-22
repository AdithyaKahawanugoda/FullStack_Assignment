import React from "react";
import { ContainerCard } from "../../components/index";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="angry-grid">
        <div id="item-0">&nbsp;0</div>
        <div id="item-1">
          <ContainerCard>Hi</ContainerCard>
        </div>
        <div id="item-2">&nbsp;2</div>
        <div id="item-3">&nbsp;3</div>
        <div id="item-4">&nbsp;4</div>
      </div>
    </>
  );
};

export default Home;
