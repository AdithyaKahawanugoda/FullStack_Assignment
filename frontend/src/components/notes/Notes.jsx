import React, { useState, useEffect } from "react";
import "./Notes.css";
import { Pagination, AddNewNote } from "../index";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { teal, red } from "@mui/material/colors";
import axios from "axios";

const Notes = () => {
  const [notesList, setNotesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    console.log(1);
    const getNotes = async () => {
      console.log(2);
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get(`http://localhost:5000/api/note/getAll?page=${page}`, config)
        .then((res) => {
          console.log(res);
          setPages(res.data.pages);
          setNotesList(res.data.notes);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (
      localStorage.getItem("authToken") &&
      localStorage.getItem("accountType") === "STUDENT"
    ) {
      getNotes();
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
    <div className="note-list-container">
      <div className="note-list-container-heading">User list</div>
      <div className="note-list-item-container">
        <div className="note-list-item-headings">
          <div className="note-list-item-column1">Title</div>
          <div className="note-list-item-column2">Description</div>
          <div className="note-list-item-column3">Update</div>
          <div className="note-list-item-column4">Delete</div>
        </div>
        <div className="note-list-item-container-boundary">
          {notesList?.length > 0 &&
            notesList.map((note, index) => {
              return (
                <div className="note-list-item-boundary" key={index}>
                  <div className="note-list-item-column1">{note?.title}</div>
                  <div className="note-list-item-column2">
                    {note?.description}
                  </div>
                  <div className="note-list-item-column3">
                    <ModeEditOutlineRoundedIcon
                      onClick={() => {
                        setSelectedNote(note);
                        setOpenUpdate(true);
                      }}
                      style={{ color: teal[500] }}
                    />
                  </div>
                  <div className="note-list-item-column4">
                    <DeleteForeverRoundedIcon
                      onClick={() => {
                        setSelectedNote(note);
                        setOpenDelete(true);
                      }}
                      style={{ color: red[500] }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="note-list-pagination">
          <Pagination page={page} pages={pages} changePage={setPage} />
        </div>
        {!isLoading && selectedNote && (
          <Modal
            open={openUpdate}
            onClose={() => {
              setOpenUpdate(false);
              setSelectedNote(null);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyles}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Note Update Window
              </Typography>
              <AddNewNote selectedNote={selectedNote} />
            </Box>
          </Modal>
        )}
        {!isLoading && selectedNote && (
          <Modal
            open={openDelete}
            onClose={() => {
              setOpenDelete(false);
              setSelectedNote(null);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyles}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete Confirmation Window
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Notes;
