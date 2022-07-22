import React, { useState } from "react";
import {
  ContainerCard,
  Login,
  SignUp,
  ProfileUpdate,
} from "../../components/index";
import "./Home.css";

const Home = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);

  const currentTabHandler = (tabNo) => {
    if (currentSection === 1) {
      if (tabNo === 1 || tabNo === 2) {
        setCurrentTab(tabNo);
      }
    }
  };

  const currentSectionHandler = (sectionNo) => {
    if (currentTab === 2) {
      if (sectionNo === 1 || sectionNo === 2) {
        setCurrentSection(sectionNo);
      }
    }
  };

  return (
    <>
      <div className="home-page-angry-grid">
        <div id="home-page-item-0">&nbsp;0</div>
        <div id="home-page-item-1">
          {currentSection === 1 && (
            <ContainerCard>
              <div class="home-container-angry-grid">
                <div id="home-container-item-0">
                  <div
                    onClick={() => {
                      currentTabHandler(1);
                    }}
                  >
                    SignUp
                  </div>
                </div>
                <div id="home-container-item-1">
                  {currentTab === 1 && (
                    <div>
                      <SignUp tabNavigator={currentTabHandler} />
                    </div>
                  )}
                  {currentTab === 2 && (
                    <div>
                      <Login sectionNavigator={currentSectionHandler} />
                    </div>
                  )}
                </div>
                <div id="home-container-item-2">
                  <div
                    onClick={() => {
                      currentTabHandler(2);
                    }}
                  >
                    Login
                  </div>
                </div>
              </div>
            </ContainerCard>
          )}
          {currentSection === 2 && (
            <ContainerCard>
              <button
                onClick={() => {
                  currentSectionHandler(1);
                }}
              >
                Back
              </button>
              <ProfileUpdate />
            </ContainerCard>
          )}
        </div>
        <div id="home-page-item-2">&nbsp;2</div>
        <div id="home-page-item-3">&nbsp;3</div>
        <div id="home-page-item-4">&nbsp;4</div>
      </div>
    </>
  );
};

export default Home;
