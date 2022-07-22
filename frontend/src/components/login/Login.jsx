import React from "react";
import "./Login.css";

const Login = ({ sectionNavigator }) => {
  const loginHandler = () => {
    alert("login!!");
    // if login success and acc status is false
    sectionNavigator(2);
  };

  return (
    <div>
      <div>
        Email <input type={"text"} />
      </div>
      <div>
        Password <input type={"text"} />
      </div>
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;
