import React, { useState } from "react";
import "./AddNewNote.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BarLoader from "react-spinners/BarLoader";
import { Formik } from "formik";
import * as Yup from "yup";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import axios from "axios";

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Note title is required"),
  description: Yup.string().trim().required("Description is required"),
});

const AddNewNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="note-add-container">
      <div className="note-add-container-heading">Add New Note..</div>
      <div>
        <Formik
          initialValues={{
            title: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const config = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
            await axios
              .post("http://localhost:5000/api/note/add", values, config)
              .then((res) => {
                console.log(res);
                resetForm({
                  values: {
                    title: "",
                    description: "",
                  },
                });
                setIsLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          }}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
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
              <div className="note-add-container-input-field">
                <TextField
                  variant="outlined"
                  label="Title"
                  id="title"
                  fullWidth
                  size="small"
                  type="text"
                  InputLabelProps={{
                    style: { fontWeight: 700, fontSize: "1em" },
                  }}
                  onChange={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />
                {errors.title && touched.title ? (
                  <div className="profile-update-container-input-field-error-text">
                    {errors.title}
                  </div>
                ) : null}
              </div>
              <div className="note-add-container-input-field">
                <TextField
                  variant="outlined"
                  label="Description"
                  id="description"
                  fullWidth
                  size="small"
                  type="text"
                  InputLabelProps={{
                    style: { fontWeight: 700, fontSize: "1em" },
                  }}
                  onChange={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                />
                {errors.description && touched.description ? (
                  <div className="note-add-container-input-field-error-text">
                    {errors.description}
                  </div>
                ) : null}
              </div>

              <div className="note-add-container-submit-btn">
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  endIcon={<AddTaskRoundedIcon />}
                >
                  <div className="note-add-container-submit-btn-text">Add</div>
                </Button>
                {isLoading && <BarLoader width={"100%"} />}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewNote;
