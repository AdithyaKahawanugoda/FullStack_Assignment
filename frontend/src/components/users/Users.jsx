import React, { useState, useEffect } from "react";
import "./Users.css";
import { Pagination } from "../index";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Users = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get(`http://localhost:5000/api/user/getAll?page=${page}`, config)
        .then((res) => {
          setPages(res.data.pages);
          setUsersList(res.data.users);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (
      localStorage.getItem("authToken") &&
      localStorage.getItem("accountType") === "ADMIN"
    ) {
      getUsers();
    }
  }, [page]);

  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="user-list-container">
      <div className="user-list-container-heading">User list</div>
      <div className="user-list-item-container">
        <div className="user-list-item-headings">
          <div>User ID</div>
          <div>Full Name</div>
          <div>Account Type</div>
        </div>
        <div className="user-list-item-container-boundary">
          {usersList.length > 0 &&
            usersList.map((user, index) => {
              return (
                <div
                  className="user-list-item-boundary"
                  key={index}
                  onClick={() => {
                    setSelectedUser(user);
                    setOpen(true);
                  }}
                >
                  <div>{user.id}</div>
                  <div>
                    {user.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : "NOT UPDATED YET"}
                  </div>
                  <div>{user.accountType}</div>
                </div>
              );
            })}
        </div>

        <div className="user-list-pagination">
          <Pagination page={page} pages={pages} changePage={setPage} />
        </div>
      </div>
      {!isLoading && selectedUser && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedUser(null);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyles}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User Information
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              ID: {selectedUser?.id}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Name:{" "}
              {selectedUser?.firstName
                ? `${selectedUser?.firstName} ${selectedUser?.lastName}`
                : "NOT UPDATED YET"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Email: {selectedUser?.email}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Mobile:{" "}
              {selectedUser?.mobile
                ? `${selectedUser.mobile}`
                : "NOT UPDATED YET"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              DOB:{" "}
              {selectedUser?.dateOfBirth
                ? `${selectedUser?.dateOfBirth}`
                : "NOT UPDATED YET"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Account Status: {selectedUser?.status.toString()}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Account Type: {selectedUser?.accountType}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Users;
