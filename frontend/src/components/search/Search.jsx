import React, { useState } from "react";
import "./Search.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { teal, red } from "@mui/material/colors";
import BarLoader from "react-spinners/BarLoader";
import { ResultsModal } from "../index";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [isHover, setIsHover] = useState(false);

  const searchHandler = async () => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    await axios
      .get(`http://localhost:5000/api/user/search?term=${search}`, config)
      .then((res) => {
        setResults(res.data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const resultsHandler = () => {
    setResults(null);
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
      {!isLoading && results && (
        <ResultsModal users={results} resultsHandler={resultsHandler} />
      )}
    </>
  );
};

export default Search;
