import React from "react";
import "./Search.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { teal } from "@mui/material/colors";
import validator from "validator";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";

const Search = () => {
  return (
    <>
      <OutlinedInput
        variant="outlined"
        label="E-mail"
        id="field1"
        fullWidth
        size="small"
        type="text"
        InputLabelProps={{
          style: { fontWeight: 700, fontSize: "1em", autoComplete: "false" },
        }}
        endAdornment={
          <InputAdornment position="end">
            <ManageSearchRoundedIcon style={{ color: teal[500] }} />
          </InputAdornment>
        }
        onChange={(e) => {
          // emailInputHandler(e.target.value);
        }}
        // value={email}
      />
      <BarLoader width={"100%"} />
      {/* <input className="search-container" /> */}
    </>
  );
};

export default Search;
