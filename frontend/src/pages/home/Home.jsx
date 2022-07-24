import React, { useState } from "react";
import {
  ContainerCard,
  Login,
  SignUp,
  ProfileUpdate,
  AccountTypeSelection,
} from "../../components/index";
import "./Home.css";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const Home = () => {
  const [currentSection, setCurrentSection] = useState(1); //set to 1
  const [currentTab, setCurrentTab] = useState(1); //set to 1

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
              <div
                className="home-container-back-btn"
                onClick={() => {
                  currentSectionHandler(1);
                }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  style={{ backgroundColor: teal[500] }}
                  endIcon={<ArrowBackIosRoundedIcon />}
                >
                  <div className="home-container-back-btn-text">Back</div>
                </Button>
              </div>
              <p className="home-container-update-profile-text">
                Please fill following fields to complete your registration
              </p>
              <ProfileUpdate sectionNavigator={currentSectionHandler} />
            </ContainerCard>
          )}
          {currentSection === 3 && (
            <ContainerCard>
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
