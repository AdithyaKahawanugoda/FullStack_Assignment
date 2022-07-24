import React, { useState, useEffect } from "react";
import "./Search.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { teal, red } from "@mui/material/colors";
import validator from "validator";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isHover, setIsHover] = useState(false);

  const searchHandler = async () => {
    await axios.get();
  };

  const hoverInHandler = () => {
    setIsHover(true);
  };
  const hoverOutHandler = () => {
    setIsHover(false);
  };

  return (
    <>
      <TextField
        variant="outlined"
        label="Search"
        placeholder="Search by name, email or id.."
        id="field1"
        fullWidth
        size="small"
        type="text"
        InputLabelProps={{
          style: { fontWeight: 700, fontSize: "1em", autoComplete: "false" },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ManageSearchRoundedIcon
                onClick={searchHandler}
                style={{
                  color: isHover ? red[500] : teal[500],
                  fontSize: "30px",
                }}
                onMouseEnter={hoverInHandler}
                onMouseLeave={hoverOutHandler}
              />
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />
      {isLoading && <BarLoader width={"100%"} />}
    </>
  );
};

export default Search;
