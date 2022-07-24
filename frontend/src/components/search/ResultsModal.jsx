import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import "./ResultsModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const ResultsModal = ({ users, resultsHandler }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openChild, setOpenChild] = useState(false);
  const handleChildModalOpen = () => {
    setOpenChild(true);
  };
  const handleChildModalClose = () => {
    setSelectedUser(null);
    setOpenChild(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="medium"
        style={{ backgroundColor: teal[500], marginTop: "10px" }}
        onClick={handleOpen}
      >
        View Results
      </Button>
      <Modal
        open={open}
        onClose={() => {
          resultsHandler();
          handleClose();
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <h2 id="parent-modal-title">Search Results</h2>
          <div>
            {users?.map((value, index) => {
              return (
                <div
                  className="search-result-list-item"
                  key={index}
                  onClick={() => {
                    setSelectedUser(value);
                    handleChildModalOpen(true);
                  }}
                >
                  <div className="search-result-list-item-column1">
                    ID: {value?.id}
                  </div>
                  <div className="search-result-list-item-column2">
                    Name: {value?.firstName} {value?.lastName}
                  </div>
                  <div className="search-result-list-item-column3">
                    Email: {value?.email}
                  </div>
                </div>
              );
            })}
          </div>
          {/* <ChildModal userData={selectedUser}/> */}
          {selectedUser && (
            <Modal
              hideBackdrop
              open={openChild}
              onClose={handleChildModalClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 400 }}>
                <h2 id="child-modal-title">User Details</h2>
                <div className="search-result-selected-user-details">
                  <div className="search-result-selected-user-details-field">
                    ID: {selectedUser?.id}
                  </div>
                  <div className="search-result-selected-user-details-field">
                    Name: {selectedUser?.firstName} {selectedUser?.lastName}
                  </div>
                  <div className="search-result-selected-user-details-field">
                    Email: {selectedUser?.email}
                  </div>
                  <div className="search-result-selected-user-details-field">
                    Mobile: {selectedUser?.mobile}
                  </div>
                  <div className="search-result-selected-user-details-field">
                    Account Type: {selectedUser?.accountType}
                  </div>
                  <div className="search-result-selected-user-details-field">
                    Account Status: {selectedUser?.status?.toString()}
                  </div>
                </div>
                <Button
                  variant="contained"
                  size="medium"
                  style={{ backgroundColor: teal[500] }}
                  onClick={handleChildModalClose}
                >
                  Close
                </Button>
              </Box>
            </Modal>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ResultsModal;
