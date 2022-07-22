import React from "react";
import { ContainerCard } from "../../components/index";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-page-angry-grid">
        <div id="home-page-item-0">&nbsp;0</div>
        <div id="home-page-item-1">
          <ContainerCard>Hi</ContainerCard>
        </div>
        <div id="home-page-item-2">&nbsp;2</div>
        <div id="home-page-item-3">&nbsp;3</div>
        <div id="home-page-item-4">&nbsp;4</div>
      </div>
    </>
  );
};

export default Home;
