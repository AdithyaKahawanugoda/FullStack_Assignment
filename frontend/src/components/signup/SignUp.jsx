import React from "react";
import "./SignUp.css";

const SignUp = ({ tabNavigator }) => {
  const registrationHandler = () => {
    alert(
      "registration is done! temporary password has been sent to the provided email"
    );
    // if email is valid & after getting response from BE
    tabNavigator(2);
  };
  return (
    <div>
      <div>
        Email <input type={"text"} />
      </div>
      <button onClick={registrationHandler}>Register</button>
    </div>
  );
};

export default SignUp;
