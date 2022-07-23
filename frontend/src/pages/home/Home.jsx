import React, { useState } from "react";
import {
  ContainerCard,
  Login,
  SignUp,
  ProfileUpdate,
  AccountTypeSelection,
} from "../../components/index";
import "./Home.css";

const Home = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);

  // tab 1 - signup
  // tab 2 - login
  // both in section 1
  const currentTabHandler = (tabNo) => {
    if (currentSection === 1) {
      if (tabNo === 1 || tabNo === 2) {
        setCurrentTab(tabNo);
      }
    }
  };

  // section 1 - login & signup
  // section 2 - profile update & password reset
  // section 3 - account type selection
  const currentSectionHandler = (sectionNo) => {
    if (currentTab === 2) {
      if (sectionNo === 1 || sectionNo === 2 || sectionNo === 3) {
        setCurrentSection(sectionNo);
      }
    }
  };

  return (
    <>
      <div className="home-page-angry-grid">
        <div id="home-page-item-0"></div>
        <div id="home-page-item-1">
          {currentSection === 1 && (
            <ContainerCard>
              <div className="home-container-angry-grid">
                <div id="home-container-item-0">
                  <div
                    className={`${
                      currentTab === 1 && "home-container-tab-selected"
                    } home-container-tab`}
                    onClick={() => {
                      currentTabHandler(1);
                    }}
                  >
                    <div className="home-container-tab-heading"> SignUp</div>
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
                    className={`${
                      currentTab === 2 && "home-container-tab-selected"
                    } home-container-tab`}
                    onClick={() => {
                      currentTabHandler(2);
                    }}
                  >
                    <div className="home-container-tab-heading"> Login</div>
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
                Back to signup/login
              </button>
              <ProfileUpdate />
              <button
                onClick={() => {
                  currentSectionHandler(3);
                }}
              >
                Next section
              </button>
            </ContainerCard>
          )}
          {currentSection === 3 && (
            <ContainerCard>
              <button
                onClick={() => {
                  currentSectionHandler(2);
                }}
              >
                Back to profile update
              </button>
              <AccountTypeSelection />
            </ContainerCard>
          )}
        </div>
        <div id="home-page-item-2"></div>
        <div id="home-page-item-3"></div>
        <div id="home-page-item-4"></div>
      </div>
    </>
  );
};

export default Home;
