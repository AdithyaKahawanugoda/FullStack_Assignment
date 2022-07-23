import React, { useState, useEffect } from "react";
import "./SignUp.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BarLoader from "react-spinners/BarLoader";
import validator from "validator";
import axios from "axios";

const SignUp = ({ tabNavigator }) => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const partialRegHandler = () => {
      setOpen(true);
      setIsLoading(false);
    };

    if (notification) {
      partialRegHandler();
    }
  }, [notification]);

  const emailInputHandler = (inputText) => {
    setIsValid(true);
    setEmail(inputText);
    if (!validator.isEmail(email)) {
      setIsValid(false);
    }
  };

  const registrationHandler = async (e) => {
    e.preventDefault();
    if (isValid && email.length > 0) {
      setIsLoading(true);
      setIsSubmit(true);
      await axios
        .post("http://localhost:5000/api/auth/register", { email })
        .then((res) => {
          console.log(res);
          setNotification(res.data.msg);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

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
    <div>
      <div className="signup-component-email-container">
        <TextField
          variant="outlined"
          label="E-mail"
          id="email"
          fullWidth
          size="small"
          type="text"
          InputLabelProps={{ style: { fontWeight: 700, fontSize: "1em" } }}
          onChange={(e) => {
            emailInputHandler(e.target.value);
          }}
          onBlur={() => {
            if (email.length === 0) {
              setIsValid(true);
            }
          }}
          value={email}
        />
        <div>{!isValid && <p>Email is not valid</p>}</div>
      </div>
      <div className="signup-component-register-btn">
        <Button
          variant="contained"
          size="medium"
          startIcon={<ArrowForwardIosRoundedIcon />}
          onClick={registrationHandler}
          disabled={isSubmit}
        >
          <div className="signup-component-register-btn-text">Register</div>
        </Button>
        {isLoading && <BarLoader width={"100%"} />}
        {!isLoading && notification && (
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
              tabNavigator(2);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyles}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Important!
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {notification}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                A temporary password has been sent to the provided email. Please
                use if for the first-time login.
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SignUp;
