import React, { useState, useEffect } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import BarLoader from "react-spinners/BarLoader";
import validator from "validator";
import axios from "axios";

const Login = ({ sectionNavigator }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("accountType");
    const loginSuccessHandler = () => {
      if (loginData?.token && loginData?.userAccountType) {
        localStorage.setItem("authToken", loginData.token);
        localStorage.setItem("accountType", loginData.userAccountType);
      }

      if (loginData?.userStatus === false) {
        sectionNavigator(2);
      } else if (loginData?.userStatus === true) {
        sectionNavigator(3);
      }

      setIsLoading(false);
      setIsSubmit(false);
    };
    if (loginData) {
      loginSuccessHandler();
    }
  }, [loginData, sectionNavigator]);

  const emailInputHandler = (inputText) => {
    setIsValid(true);
    setEmail(inputText);
    if (!validator.isEmail(email)) {
      setIsValid(false);
    }
  };

  const passwordInputHandler = (inputText) => {
    setPassword(inputText);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (isValid && email.length > 0 && password.length > 5) {
      setIsLoading(true);
      setIsSubmit(true);
      await axios
        .post("http://localhost:5000/api/auth/login", { email, password })
        .then((res) => {
          console.log(res);
          setLoginData(res.data);
        })
        .catch((error) => {
          console.log(error);
          setErrorText(error.response.data.msg);
          setEmail("");
          setPassword("");
          setIsValid(true);
          setIsSubmit(false);
          setIsLoading(false);
        });
    }
  };

  return (
    <div>
      <div className="login-component-email-container">
        <TextField
          variant="outlined"
          label="E-mail"
          id="field1"
          fullWidth
          size="small"
          type="text"
          InputLabelProps={{
            style: { fontWeight: 700, fontSize: "1em", autoComplete: "false" },
          }}
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
      <div className="login-component-password-container">
        <TextField
          variant="outlined"
          label="Password"
          id="field2"
          fullWidth
          size="small"
          type="password"
          autoComplete="new-password"
          InputLabelProps={{
            style: { fontWeight: 700, fontSize: "1em", autoComplete: "false" },
          }}
          onChange={(e) => {
            passwordInputHandler(e.target.value);
          }}
          value={password}
        />
        <div>
          {password && password.length < 6 && (
            <p>Password should contain at least 6 characters</p>
          )}
        </div>
      </div>
      <div className="login-component-login-btn">
        <Button
          variant="contained"
          size="medium"
          style={{ backgroundColor: teal[500] }}
          startIcon={<ArrowForwardIosRoundedIcon />}
          onClick={loginHandler}
          disabled={isSubmit}
        >
          <div className="login-component-login-btn-text">Login</div>
        </Button>
        {isLoading && <BarLoader width={"100%"} />}
      </div>
      {errorText && (
        <div className="login-component-error-text">{errorText}</div>
      )}
    </div>
  );
};

export default Login;
