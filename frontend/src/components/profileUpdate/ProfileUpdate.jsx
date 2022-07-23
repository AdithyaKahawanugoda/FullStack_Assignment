import React, { useState, useEffect } from "react";
import "./ProfileUpdate.css";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BarLoader from "react-spinners/BarLoader";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  password: Yup.string()
    .min(6, "Please enter a valid password (min. 6 chars)")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  mobile: Yup.number()
    .positive()
    .integer()
    .min(10, "Please enter a valid phone number")
    .required("Phone number is required"),
  dateOfBirth: Yup.date().required("DOB is required"),
});

const ProfileUpdate = ({ sectionNavigator }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          dateOfBirth: Date.now(),
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await axios
            .post("http://localhost:5000/api/user/updateProfile", values)
            .then((res) => {
              console.log(res.data);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsLoading(true);
              handleSubmit();
            }}
          >
            <div className="profile-update-container-angry-grid">
              <div id="profile-update-container-item-0">
                <div className="profile-update-container-input-field">
                  <TextField
                    variant="outlined"
                    label="First Name"
                    id="firstName"
                    fullWidth
                    size="small"
                    type="text"
                    InputLabelProps={{
                      style: { fontWeight: 700, fontSize: "1em" },
                    }}
                    onChange={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="profile-update-container-input-field-error-text">
                      {errors.firstName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div id="profile-update-container-item-1">
                <div className="profile-update-container-input-field">
                  <TextField
                    variant="outlined"
                    label="Last Name"
                    id="lastName"
                    fullWidth
                    size="small"
                    type="text"
                    InputLabelProps={{
                      style: { fontWeight: 700, fontSize: "1em" },
                    }}
                    onChange={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className="profile-update-container-input-field-error-text">
                      {errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div id="profile-update-container-item-2">
                <div className="profile-update-container-input-field">
                  <TextField
                    variant="outlined"
                    label="Contact no."
                    id="mobile"
                    fullWidth
                    size="small"
                    type="text"
                    InputLabelProps={{
                      style: { fontWeight: 700, fontSize: "1em" },
                    }}
                    onChange={handleChange("mobile")}
                    onBlur={handleBlur("mobile")}
                    value={values.mobile}
                  />
                  {errors.mobile && touched.mobile ? (
                    <div className="profile-update-container-input-field-error-text">
                      {errors.mobile}
                    </div>
                  ) : null}
                </div>
              </div>
              <div id="profile-update-container-item-3">
                <div className="profile-update-container-input-field">
                  <TextField
                    variant="outlined"
                    label="Email"
                    fullWidth
                    size="small"
                    type="text"
                    InputLabelProps={{
                      style: { fontWeight: 700, fontSize: "1em" },
                    }}
                    disabled
                    // value={email}
                  />
                </div>
              </div>
              <div id="profile-update-container-item-4">
                <div className="profile-update-container-input-field">
                  <TextField
                    variant="outlined"
                    label="Password"
                    id="password"
                    fullWidth
                    size="small"
                    type="password"
                    autoComplete="new-password"
                    InputLabelProps={{
                      style: { fontWeight: 700, fontSize: "1em" },
                    }}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <div className="profile-update-container-input-field-error-text">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
              </div>
              <div id="profile-update-container-item-5">
                <div className="profile-update-container-input-field">
                  <TextField
                    variant="outlined"
                    label="Confirm Password"
                    id="confirmPassword"
                    fullWidth
                    size="small"
                    type="password"
                    InputLabelProps={{
                      style: { fontWeight: 700, fontSize: "1em" },
                    }}
                    onChange={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="profile-update-container-input-field-error-text">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <div id="profile-update-container-item-6">
                <div className="profile-update-container-input-field">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date of Birth"
                      onChange={(value) =>
                        setFieldValue("dateOfBirth", value, true)
                      }
                      onBlur={handleBlur("dateOfBirth")}
                      value={values.dateOfBirth}
                      renderInput={(params) => (
                        <TextField
                          error={Boolean(
                            touched.dateOfBirth && errors.dateOfBirth
                          )}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {errors.dateOfBirth && touched.dateOfBirth ? (
                    <div className="profile-update-container-input-field-error-text">
                      {errors.dateOfBirth}
                    </div>
                  ) : null}
                </div>
              </div>
              <div id="profile-update-container-item-7"></div>
            </div>
            <div className="profile-update-container-submit-btn">
              <Button
                variant="contained"
                size="medium"
                type="submit"
                endIcon={<ArrowForwardIosRoundedIcon />}
              >
                <div className="profile-update-container-submit-btn-text">
                  Submit
                </div>
              </Button>
              {isLoading && <BarLoader width={"100%"} />}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ProfileUpdate;
